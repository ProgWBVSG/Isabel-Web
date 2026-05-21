export default async function handler(req, res) {
  // CORS — solo permitir nuestro dominio
  const allowedOrigins = ['https://www.reinventadas50.com', 'https://reinventadas50.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Configuración de base de datos faltante' });
  }

  try {
    // Obtener total de leads de Supabase usando HEAD con count exacto
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=id`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'count=exact'
      }
    });

    if (!response.ok) {
      throw new Error('Error al conectar con Supabase');
    }

    // El count viene en el header Content-Range "0-x/TOTAL"
    const contentRange = response.headers.get('content-range');
    let totalSubscribers = 0;
    
    if (contentRange) {
      const parts = contentRange.split('/');
      if (parts.length === 2) {
        totalSubscribers = parseInt(parts[1], 10) || 0;
      }
    } else {
      // Fallback: parsear JSON
      const data = await response.json();
      totalSubscribers = Array.isArray(data) ? data.length : 0;
    }

    return res.status(200).json({ totalSubscribers, campaigns: [] });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'Fallo al obtener estadísticas' });
  }
}
