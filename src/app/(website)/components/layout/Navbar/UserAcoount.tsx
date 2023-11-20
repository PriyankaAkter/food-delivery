"use client";
import { signOut } from "next-auth/react";

const UserAcoount = () => {
  return (
    <button onClick={()=>signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`
    })} className=" text-black">
    Sign Out
  </button>
    
  );
};

export default UserAcoount;
