
'use client'
import { SideBar } from './components/SideBar'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const page = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  // Check if the session is still loading
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (!session || session?.user?.role !== "DELIVERY_MAN") {
    router.replace("/sign-in"); 
    return null; 
  }
  return (
    <div className='container flex gap-16 py-16'>
      <SideBar />
    </div>
  )
}

export default page