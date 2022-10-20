import React from 'react'
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export default function OrderDetail(props) {

  const customerName = props.order
  return (
    <div className={`container`}>{console.log(customerName)}</div>
  )
}

export async function getStaticProps(context) {
    const { orderId } = context.params;
    
    const payment = await stripe.checkout.sessions.retrieve(`cs_test_a1IPmVApDuAlsqm0VtvBxGWKuYrzapI8qruSyVnKKcPFH0zNkqTyVAvlj6`, {
      expand: ['line_items']
    }
  )
    const customer = await stripe.customers.retrieve(payment.customer)
    // const payment = await stripe.paymentIntents.retrieve(session.payment_intent)
    // const customerName = payment.charges.data[0].billing_details.nam
  
    return {
      props: {
        order: payment,
        // customerName: customerName
      },
    };
  }
  
  export async function getStaticPaths() {
    return { paths: [], fallback: "blocking" };
  }
  