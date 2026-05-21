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

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Configuración faltante' });
  }

  try {
    const body = req.body;
    
    // Validación estricta de campos
    if (!body.nombre || typeof body.nombre !== 'string' || body.nombre.trim().length === 0) {
      return res.status(400).json({ error: 'El nombre es obligatorio.' });
    }
    if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
      return res.status(400).json({ error: 'Email inválido.' });
    }

    // Sanitizar: solo permitir campos conocidos para evitar inyección de datos
    const allowedStatuses = ['nuevo', 'contactado', 'en_proceso', 'cliente', 'descartado'];
    let finalStatus = allowedStatuses.includes(body.status) ? body.status : 'nuevo';

    const leadData = {
      nombre: body.nombre.trim().slice(0, 200),
      email: body.email.trim().toLowerCase().slice(0, 320),
      telefono: body.telefono ? String(body.telefono).trim().slice(0, 30) : null,
      status: finalStatus,
      origen: body.origen ? String(body.origen).trim().slice(0, 100) : 'agregado_manual',
      notas: null
    };

    // Si el status original era newsletter/whatsapp, lo anotamos
    if (body.status && !allowedStatuses.includes(body.status)) {
      leadData.notas = `[Preferencia: ${String(body.status).slice(0, 30)}]`;
    }

    // Insertar con Service Key (salta RLS)
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(leadData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase Error:', errorText);
      return res.status(500).json({ error: 'Error al guardar en la base de datos.' });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error insertando lead:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
