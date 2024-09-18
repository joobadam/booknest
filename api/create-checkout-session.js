const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const corsOptions = {
  origin: '*',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = async (req, res) => {
  console.log('Function started');
  console.log('Request method:', req.method);
  console.log('Request headers:', JSON.stringify(req.headers));
  console.log('Request body:', JSON.stringify(req.body));
  
 
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
    console.log('OPTIONS request handled');
    return;
  }


  await new Promise((resolve) => cors(corsOptions)(req, res, resolve));
  console.log('CORS middleware applied');

  if (req.method === 'POST') {
    console.log('Processing POST request');
    try {
      const { accommodationId, checkIn, checkOut, guests, totalPrice } = req.body;
      console.log('Parsed request body:', { accommodationId, checkIn, checkOut, guests, totalPrice });

      console.log('Creating Stripe checkout session');
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'huf',
              product_data: {
                name: 'Szállásfoglalás',
                description: `${checkIn} - ${checkOut}, ${guests} vendég`,
              },
              unit_amount: totalPrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/booking/${accommodationId}`,
      });

      console.log('Checkout session created:', session.id);
      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    console.log('Method not allowed:', req.method);
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
  console.log('Function completed');
};