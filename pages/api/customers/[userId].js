import { doc, setDoc, collection } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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


export default async function handler(req, res) {

  const { userId } = req.query


  if (req.method === "POST") {
    const data = req.body.body
    const items = [];
    // const data = req.body.body;
    if(data){
    data.map((item) =>
      items.push({
        price_data: {
          currency: "usd",
          tax_behavior: "exclusive",
          unit_amount: item.price * 100,

          product_data: {
            name: item.name,
            description: "SKU: " + item.sku,
            images: ["https:" + item.image],
            tax_code: 'txcd_40400005'
          },
        },
        quantity: item.amount,
      })
    )}

    const redirectURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://grocery-store-git-main-berna2103.vercel.app";

    const checkout_data = {
        payment_method_types: ["card"],
        line_items: items,
        mode: "payment",
        success_url: `${redirectURL}/success`,
        cancel_url: `${redirectURL}/canceled`,}

    try {
      // Create Checkout Sessions from body params.

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items,
        mode: "payment",
        success_url: `${redirectURL}/success`,
        cancel_url: `${redirectURL}/canceled`,
      });

      const newSessionRef = doc(collection(db, `customers/${userId}/checkout_sessions`));
      await setDoc(newSessionRef, session);

       res.json({ session });
       res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
