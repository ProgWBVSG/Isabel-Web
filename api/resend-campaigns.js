export default async function handler(req, res) {
  // CORS — solo permitir nuestro dominio
  const allowedOrigins = ['https://www.reinventadas50.com', 'https://reinventadas50.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { subject, content, audience } = req.body;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  // Validación de campos
  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    return res.status(400).json({ error: 'El asunto es obligatorio.' });
  }
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return res.status(400).json({ error: 'El contenido del mensaje es obligatorio.' });
  }
  if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Configuración del servidor incompleta.' });
  }

  // Sanitizar contenido HTML para evitar inyección de scripts
  const sanitizedContent = content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');

  try {
    // 1. Obtener los emails de la base de datos de Supabase (Tabla leads)
    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=email,nombre`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!supabaseRes.ok) {
      throw new Error('Error al conectar con la base de datos de contactos.');
    }

    const leads = await supabaseRes.json();
    
    // Filtrar emails válidos y eliminar duplicados
    const uniqueEmails = [...new Set(leads.map(l => l.email).filter(Boolean))];

    if (uniqueEmails.length === 0) {
      return res.status(400).json({ error: 'No se encontraron contactos con email en la base de datos.' });
    }

    // 2. Preparar el lote (Batch) para Resend
    // Plan gratuito: máximo 100 correos por día. Dividimos en batches de 100.
    const batchLimit = 100;
    const emailsToSend = uniqueEmails.slice(0, batchLimit);

    const resendPayload = emailsToSend.map(email => ({
      from: 'Isabel <contacto@reinventadas50.com>',
      to: [email],
      subject: subject.trim(),
      html: `<div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.7; max-width: 600px; margin: 0 auto; padding: 30px 20px;">
              <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
                <h1 style="font-family: Georgia, serif; color: #2d2d2d; font-weight: 300; font-size: 24px; margin: 0;">Reinventadas 5.0</h1>
              </div>
              <div style="font-size: 16px;">
                ${sanitizedContent}
              </div>
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
                <p>Recibiste este correo porque sos parte de la comunidad Reinventadas 5.0</p>
              </div>
            </div>`
    }));

    // 3. Enviar a Resend
    const resendResponse = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendPayload)
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error('Error de Resend:', errorData);
      return res.status(resendResponse.status).json({ 
        error: 'Fallo al enviar mediante Resend.', 
        details: errorData.message || JSON.stringify(errorData) 
      });
    }

    const data = await resendResponse.json();
    return res.status(200).json({ 
      success: true, 
      count: emailsToSend.length, 
      data 
    });
  } catch (error) {
    console.error('Error en resend-campaigns:', error);
    return res.status(500).json({ error: 'Error interno del servidor. Intenta de nuevo.' });
  }
}
