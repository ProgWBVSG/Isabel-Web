export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { subject, content, audience } = req.body;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!subject || !content || !RESEND_API_KEY) {
    return res.status(400).json({ error: 'Faltan campos o la API key de Resend' });
  }

  try {
    // 1. Obtener los emails de la base de datos de Supabase (Tabla leads)
    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=email`, {
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
    let emails = leads.map(l => l.email).filter(Boolean);

    // Filtro temporal: si tuviéramos tabla separada de newsletter, aquí filtraríamos. 
    // Por ahora enviamos a todos los leads válidos.
    if (emails.length === 0) {
      return res.status(400).json({ error: 'No se encontraron contactos en la base de datos.' });
    }

    // 2. Preparar el lote (Batch) para Resend
    // Resend permite hasta 100 emails por batch. Si hay más, habría que dividirlo.
    // Para simplificar y cubrir el plan gratuito (100 diarios), limitaremos el batch a 100 o mandaremos el batch completo (Resend cortará si excede).
    const batchLimit = 100;
    const emailsToSend = emails.slice(0, batchLimit);

    const resendPayload = emailsToSend.map(email => ({
      from: 'Isabel <contacto@reinventadas50.com>',
      to: [email],
      subject: subject,
      html: `<div style="font-family: sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
              ${content.replace(/\n/g, '<br/>')}
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
      return res.status(resendResponse.status).json({ error: 'Fallo al enviar mediante Resend', details: errorData });
    }

    const data = await resendResponse.json();
    return res.status(200).json({ success: true, count: emailsToSend.length, data });
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
