'use client'
import { SideBar } from './components/SideBar'
import Settings from './components/settings/Settings'
import OrderHistory from './components/order-history/OrderHistory'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const page = () => {
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
    <div className='container flex gap-16 py-16'>
      <SideBar />
      {/* <OrderHistory /> */}
      {/* <Settings /> */}
    </div>
  )
}

export default page