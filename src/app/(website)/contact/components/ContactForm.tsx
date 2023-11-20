import ButtonOne from '@/app/(website)/components/shared/ButtonOne'
import React from 'react'

const ContactForm = () => {
  return (
    <div className="w-full 2xl:w-[1184px] 2xl:mx-auto px-4 py-10">
      <form action="/" className="grid gap-12">
        <div className="flex flex-col 2xl:flex-row gap-5 lg:gap-10">
          <div className="w-full 2xl:w-1/2">
            <label htmlFor="name" className="font-bold font-primary">Full Name*</label>
            <br />
            <input
              className="mt-7 border border-secondary py-7 pl-6 w-full rounded-2xl"
              type="text"
              placeholder="Your Email Address"
            />
          </div>
          <div className="w-full 2xl:w-1/2">
            <label htmlFor="email" className="font-bold font-primary">Your Email*</label>
            <br />
            <input
              className="mt-7 border border-secondary py-7 pl-6 w-full rounded-2xl"
              type="email"
              placeholder="example@yourmail.com"
            />
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row gap-10">
        <div className="w-full 2xl:w-1/2">
            <label htmlFor="company" className="font-bold font-primary">Company*</label>
            <br />
            <input
              className="mt-7 border border-secondary py-7 pl-6 w-full rounded-2xl"
              type="text"
              placeholder="yourcompany name here"
            />
          </div>
          <div className="w-full 2xl:w-1/2">
            <label htmlFor="name" className="font-bold font-primary">Subject*</label>
            <br />
            <input
              className="mt-7 border border-secondary py-7 pl-6 w-full rounded-2xl"
              type="text"
              placeholder="how can we help"
            />
          </div>
        </div>
        <textarea cols={30} rows={10} placeholder="hello there,i would like to talk about how to..." className="w-full border border-secondary pt-7 pl-6 rounded-2xl"></textarea>
        <ButtonOne title="Submit" href='/' className='bg-[#F29F05] text-white' />
      </form>
    </div>
  )
}

export default ContactForm