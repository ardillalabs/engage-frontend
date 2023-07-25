import React from "react";
import Head from "next/head";
import type { Page } from "../../tsc-types/next";
import Header from "@/components/LoginPages/Header";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "@/components/LoginPages/Payment/index1";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51NJZSpE4oQnZXS7iRgA3z5BdTUeJxOJg3mUpo88pJPAPGezh7QpUanl3UvztEfZ5eSndr6qzYcXTkx0HAmEd53af00C4OJOff2"
);

// Props type
type Props = {
  Component: Page;
};

export default function Payment() {
  return (
    <>
      <Head>
        <title>Engage Payment Method</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-color min-h-screen">
        <Header subTopic="You can add your package payment" />
        <Elements stripe={stripePromise}>
          <PaymentForm/>
        </Elements>
      </main>
    </>
  );
}

Payment.getLayout = function pageLayout(page: Props) {
  return <>{page}</>;
};
