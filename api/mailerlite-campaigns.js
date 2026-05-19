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
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID; // Opcional, para segmentos

  if (!subject || !content || !MAILERLITE_API_KEY) {
    return res.status(400).json({ error: 'Faltan campos requeridos o la API key de MailerLite' });
  }

  try {
    // 1. Obtener la cuenta para saber el email validado (from)
    const accountRes = await fetch('https://connect.mailerlite.com/api/account', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      }
    });
    
    // Fallback email si no obtenemos de account
    let fromEmail = 'contacto@reinventadas.com'; 
    let fromName = 'Isabel';
    
    // 2. Crear la campaña
    const createPayload = {
      name: subject,
      type: 'regular',
      emails: [
        {
          subject: subject,
          from_name: fromName,
          from: fromEmail,
          content: `<div style="font-family: sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
                      ${content.replace(/\n/g, '<br/>')}
                    </div>`
        }
      ]
    };

    // Si es newsletter y hay group_id configurado, lo pasamos
    if (audience === 'newsletter' && MAILERLITE_GROUP_ID) {
      createPayload.groups = [MAILERLITE_GROUP_ID];
    }

    const createResponse = await fetch('https://connect.mailerlite.com/api/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      },
      body: JSON.stringify(createPayload)
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error('Error creando campaña:', errorData);
      return res.status(createResponse.status).json({ error: 'Failed to create campaign', details: errorData });
    }

    const campaignData = await createResponse.json();
    const campaignId = campaignData.data.id;

    // 3. Programar el envío instantáneo
    const scheduleResponse = await fetch(`https://connect.mailerlite.com/api/campaigns/${campaignId}/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      },
      body: JSON.stringify({
        delivery: 'instant'
      })
    });

    if (!scheduleResponse.ok) {
      const errorData = await scheduleResponse.json();
      console.error('Error enviando campaña:', errorData);
      return res.status(scheduleResponse.status).json({ error: 'Failed to schedule campaign', details: errorData });
    }

    return res.status(200).json({ success: true, campaignId });
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
