"use client";
import { useForm } from "react-hook-form";
import { items } from "../components/views/data";
import ButtonOne from "../components/shared/ButtonOne";
import BillingDetails from "./components/BillingDetails";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

const Page = () => {
  // const stripePromise = loadStripe(
  //   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  // );
  return (
   
      
        <BillingDetails />
     
    
  );
};

export default Page;
