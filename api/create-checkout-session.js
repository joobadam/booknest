const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { accommodationId, checkIn, checkOut, guests, totalPrice } = req.body;

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

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};