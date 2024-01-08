'use client'
import { signOut, useSession } from "next-auth/react";

export const UserLogOut = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    localStorage.removeItem('wishlist');
    
    signOut({
      redirect: true,
      callbackUrl: `/sign-in`,
    });
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-xl font-medium hover:text-secondary"
    >
      Sign Out
    </button>
  );
};
