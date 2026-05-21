export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY; // Usamos service key para saltar RLS

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Configuración faltante' });
  }

  try {
    let leadData = req.body;
    
    // Parche para evitar errores del CHECK CONSTRAINT (leads_status_check)
    // Supabase no acepta estados nuevos como 'newsletter' o 'whatsapp'
    const allowedStatuses = ['nuevo', 'contactado', 'en_proceso', 'cliente', 'descartado'];
    let finalStatus = leadData.status;
    
    if (!allowedStatuses.includes(finalStatus)) {
      leadData.notas = (leadData.notas ? leadData.notas + '\n' : '') + `[Preferencia: ${finalStatus}]`;
      finalStatus = 'nuevo';
    }
    
    leadData.status = finalStatus;

    // Hacer INSERT saltando el RLS (Service Key)
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
      throw new Error(errorText);
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error insertando lead:', error);
    return res.status(500).json({ error: error.message });
  }
}
