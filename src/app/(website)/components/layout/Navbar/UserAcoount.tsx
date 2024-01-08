"use client";
import { signOut } from "next-auth/react";

const UserAcoount = () => {
  const handleSignOut = () => {
    localStorage.removeItem('wishlist');
    
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`
    });
  };
  return (
    <button onClick={handleSignOut} className=" text-black">
    SIGN OUT
  </button>
    
  );
};

export default UserAcoount;
