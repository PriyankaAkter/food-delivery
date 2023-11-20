'use client'
import { signOut, useSession } from "next-auth/react";

export const AdminLogOut = () => {
 
    return (
  
      <button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `/dashboard/sign-in`,
          })
        }
        className=" text-xl font-medium hover:text-secondary"
      >
        Sign Out
      </button>
    );
  };