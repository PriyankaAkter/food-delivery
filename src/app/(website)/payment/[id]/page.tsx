"use client";


import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PayPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;


  const options:StripeElementsOptions={
    clientSecret:id,
    appearance:{
      theme:"stripe"
    }
  }

  return (
    <div>
      {id && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PayPage;
