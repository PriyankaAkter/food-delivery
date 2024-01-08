'use client'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";


export const HomeHero = () => {
  const {data:session} = useSession()
  const queryClient = useQueryClient();
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const userData = await axios.get(`http://localhost:3000/api/user/${session?.user?.id}`);
          console.log('userData:', userData);
  
          // Check if userData is defined and has the expected structure
          if (userData?.data?.user) {
            queryClient.invalidateQueries({ queryKey: ["user"] });
  
            const wishlist = userData.data.user.wishlist || [];
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
  
            console.log('Wishlist stored successfully:', wishlist);
          } else {
            console.error('userData or wishlist is undefined:', userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
  
    fetchData();
  }, [session, queryClient]);
  
  
  return (
    <div className="py-20 container ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-[186px] ">
        <div className="flex flex-col justify-center gap-5 xl:gap-12 w-full sm:w-[450px] xl:w-[650px]">
          <h1 className="">
            Best & Fastest 
            Delivery in Your Place
          </h1>
          <p className="w-full ">
            Order your foods at any time and we’ll safely delivery them straight
            to your home, we’ll it on time so you are not hungry.
          </p>
          
          <Link href='/about' className="bg-[#F29F05] w-fit text-white font-medium py-3 px-5 rounded-[4px]">
              Learn More
            </Link>
          
        </div>

        <div className="relative w-full sm:w-[450px] xl:w-full h-[250px] sm:h-[350px] xl:h-[397px]">
          <Image
            src="/assests/images/home/hero1.png"
            fill
            alt="image"
            
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};
