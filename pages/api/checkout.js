import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
      bodyParser: false,
  },
};

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const checkout = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // console.log(paymentIntent.charges.data)
     
     
      break;
    case 'checkout.session.completed':
      const checkout_session = event.data.object;
      // console.log(checkout_session)
      // Then define and call a function to handle the event payment_intent.succeeded
      break;

    case 'customer.created':
      const customer = event.data.object;
      // console.log(customer)
      // Then define and call a function to handle the event payment_intent.succeeded
      break;

    case 'charge.succeeded':
      const charge = event.data.object;
      // console.log(charge)
      // Then define and call a function to handle the event payment_intent.succeeded
      break;

    case 'order.created':
      const order = event.data.object;
      console.log(order)
      // Then define and call a function to handle the event payment_intent.succeeded
      break;

    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
}
}
export default checkout;




