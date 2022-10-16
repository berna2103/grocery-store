import { buffer } from "micro";
import Cors from 'micro-cors';
import Stripe from "stripe";
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
  measurementId: "G-ELRQXE87MD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
var webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;


if(process.env.NODE_ENV === "development"){
  webhookSecret=process.env.STRIPE_SECRET_WEBHOOK_LOCAL
}

export const config = {
  api: {
      bodyParser: false,
  },
};

export const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const checkout = async (req, res) => {

  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.log(err)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // console.log(paymentIntent.charges.data)

      console.log(paymentIntent)
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "orders"), {
        paymentIntent
      });
      
     
      break;
    case 'checkout.session.completed':
      const checkout_session = event.data.object;
      // console.log(checkout_session)

      //setDoc(doc, "users/")
      // setDoc(doc(db, "customers", "zGSLcIsVhWQTo62dZ6Kw3Wbe0Jz2"), customer);
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
  res.json(
    { received: true,
    });
}
}
export default checkout;




