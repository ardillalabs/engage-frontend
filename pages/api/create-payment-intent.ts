import { NextApiRequest, NextApiResponse } from "next";

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51NJZSpE4oQnZXS7iINBBXA2KOgWT3UfO2qzpcdbRCuANB6MIalDQqB1sFMK1hYTft2L7HHhTdAZIDpGfz6kHpcD5006KCcGQBx"
);

const calculateOrderAmount = (items: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
