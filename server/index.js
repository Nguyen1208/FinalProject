import express from "express";
import Stripe from "stripe";
// import total from '../src/screens/getTotal.js'

const app = express();
const port = 8000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51Kku6eAuXLusLu10UJXJUbbphToXBgOW4lHpyKUxDujNIdONKwp1LHGSlv3IHtBcjYnCBjNt7IJvmlO4CtvzTmTI003Nf23Mq7";
const SECRET_KEY = "sk_test_51Kku6eAuXLusLu101rJBf5nM1UNtY3bPdVxEbGbmKyEF75yKuOjhwvBoNJYUaFCiiWjmOlbYCQH3aaOnMSIGJiGL00RBr4j99w";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send("hello !!!!")
})

app.post("/create-payment-intent", async (req, res) => {
  const customer = await stripe.customers.create();
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      // amount: Math.round(total * 100) , //lowest denomination of particular currency
      amount: 3200, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});