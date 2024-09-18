const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000', 'https://booknest-dun.vercel.app'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = async (req, res) => {
  console.log('Received request');
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);
  
  await new Promise((resolve) => cors(corsOptions)(req, res, resolve));

  if (req.method === 'OPTIONS') {
    console.log('Responding to OPTIONS request');
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    console.log('Processing POST request');
    try {
      console.log('Request body:', req.body);
      const { accommodationId, checkIn, checkOut, guests, totalPrice } = req.body;

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
};