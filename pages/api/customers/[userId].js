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

    const data = req.body.body
    const { userId } = req.query
  

  if (req.method === "POST") {

      try {
        const newSessionRef = doc(collection(db, `customers/${userId}/checkout_sessions`));
        await setDoc(newSessionRef, data);
        return res.status(201).json({message: 'success', session: session})
      }catch(error){
          return res.status(501).json({message: error})
      }

  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
