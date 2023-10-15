import React from 'react'
import ContactForm from './components/ContactForm'

const Page = () => {
  return (
    <div >
         <div className='w-screen h-[300px] bg-black flex justify-center items-center'>
        <h1 className='text-white'>CONTACT US</h1>
    </div>
    <ContactForm />
    </div>
  )
}

export default Page