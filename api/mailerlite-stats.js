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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

  if (!MAILERLITE_API_KEY) {
    return res.status(400).json({ error: 'Missing MailerLite API Key' });
  }

  try {
    // 1. Obtener total de suscriptores
    const subsResponse = await fetch('https://connect.mailerlite.com/api/subscribers?limit=0', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      }
    });

    if (!subsResponse.ok) {
      throw new Error('Error al obtener suscriptores');
    }
    const subsData = await subsResponse.json();
    const totalSubscribers = subsData.meta?.total || 0;

    // 2. Obtener historial de campañas (últimas 10)
    const campResponse = await fetch('https://connect.mailerlite.com/api/campaigns?limit=10', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      }
    });
    
    let campaigns = [];
    if (campResponse.ok) {
      const campData = await campResponse.json();
      campaigns = campData.data.map(c => ({
        id: c.id,
        subject: c.emails?.[0]?.subject || c.name || 'Sin Asunto',
        status: c.status === 'ready' ? 'draft' : (c.status === 'sent' ? 'sent' : c.status),
        date: c.scheduled_for || c.created_at,
        recipients: c.stats?.sent || 0
      }));
    }

    return res.status(200).json({ 
      success: true, 
      totalSubscribers,
      campaigns
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
