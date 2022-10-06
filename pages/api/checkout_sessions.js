const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const data = req.body.body;
    const items = []
    
    data.map(item => (
       
         items.push({
            price_data: {
                currency: 'usd',
                
                product_data: {
                  name: item.name,
                //   description: item.sku,
                  images: ['https:' + item.image],
                },
                unit_amount: item.price*100,
              },
              quantity: item.amount,
        })
    ))

    const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://grocery-store-git-main-berna2103.vercel.app';
    
    try {
      // Create Checkout Sessions from body params.

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items,
        mode: 'payment',
        success_url: `${redirectURL}/success`,
        cancel_url: `${redirectURL}/canceled`,
      });
      res.json({session})
    //   res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
  console.log(res.statusCode)
}
