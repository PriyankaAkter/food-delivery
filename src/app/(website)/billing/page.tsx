"use client";
import { useForm } from "react-hook-form";
import { items } from "../components/views/data";
import ButtonOne from "../components/shared/ButtonOne";
import BillingDetails from "./components/BillingDetails";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

const Page = () => {
  // const stripePromise = loadStripe(
  //   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  // );
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check if the session is still loading
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
// console.log({session});

  // If the user is not logged in or does not have the required role, redirect to the sign-in page
  if (!session || session.user?.role !== "USER") {
    router.replace("/sign-in"); 
    return null; 
  }
  return (
   
      
        <BillingDetails />
     
    
  );
};

export default Page;
