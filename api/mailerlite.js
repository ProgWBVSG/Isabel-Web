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

  const { email, name } = req.body;
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

  if (!email || !MAILERLITE_API_KEY) {
    return res.status(400).json({ error: 'Missing required fields or API key' });
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      },
      body: JSON.stringify({
        email: email,
        fields: {
          name: name || ''
        },
        groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : []
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('MailerLite error:', errorData);
      return res.status(response.status).json({ error: 'Failed to add subscriber', details: errorData });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
