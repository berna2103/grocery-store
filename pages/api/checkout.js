import { buffer } from "micro";
import Cors from "micro-cors";
import Stripe from "stripe";
import twilio from 'twilio'
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBJhZJpi4vQJ0aUoQ0j-T3DYLDGKN__JeQ",
  authDomain: "grocery-store-338e5.firebaseapp.com",
  projectId: "grocery-store-338e5",
  storageBucket: "grocery-store-338e5.appspot.com",
  messagingSenderId: "367701901449",
  appId: "1:367701901449:web:6f25ff7dc6c4714dfc0658",
  measurementId: "G-ELRQXE87MD",
};

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
var webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (process.env.NODE_ENV === "development") {
  webhookSecret = process.env.STRIPE_SECRET_WEBHOOK_LOCAL;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const createOrder = async (sessionId) => {
  // TODO: fill me in
  
  const checkout_session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer']
  })

  const data = { session: checkout_session, active: true}

  try {
    await setDoc(doc(db, "orders", checkout_session.id), data);
    console.log(`Order Created: ${checkout_session.id}`)
  } catch (err) {
    console.log(err);
  }
}

const sendSMStoCustomer = async (sessionId) => {
  const checkout_session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer']
  })
  const data = { session: checkout_session }

  const customerPhoneNumber = data.session.customer_details.phone

  console.log(customerPhoneNumber)

  if(customerPhoneNumber){
  client.messages
  .create({
    body: `Pete's Order: ${data.session.success_url}`,
    from: '+13393452629',
    to: customerPhoneNumber,
  })
  .then((message) =>
    res.json({
      success: true,
      message: message.sid
    })
  )
  .catch((error) => {
    console.log(error);
    res.json({
      success: false,
    });
  });}

}

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const checkout = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.log(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;

        break;
        
      case "checkout.session.completed":
        const checkout_session = event.data.object;
       
        await createOrder(checkout_session.id)
        await sendSMStoCustomer(checkout_session.id)

        break;

      case "customer.created":
        const customer = event.data.object;

        break;

      case "charge.succeeded":
        const charge = event.data.object;

        break;

      case "order.created":
        const order = event.data.object;
   
        break;

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  }
};
export default checkout;
