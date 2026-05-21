export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Configuración de base de datos faltante' });
  }

  try {
    // Obtener total de leads de Supabase
    // Usando el endpoint REST de Supabase con exact count
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
        totalSubscribers = parseInt(parts[1], 10);
      }
    } else {
      // Fallback: parsear JSON
      const data = await response.json();
      totalSubscribers = data.length;
    }

    // Simular un historial de campañas por ahora, ya que Resend no tiene endpoint fácil para leer historial sin ID en plan free, 
    // o podríamos guardarlo en base de datos después.
    const campaigns = [];

    return res.status(200).json({ totalSubscribers, campaigns });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'Fallo al obtener estadísticas' });
  }
}
