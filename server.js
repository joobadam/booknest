require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  console.log('Received request for checkout session');
  try {
    const { accommodationId, checkIn, checkOut, guests, totalPrice } = req.body;
    console.log('Booking data:', { accommodationId, checkIn, checkOut, guests, totalPrice });

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
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));