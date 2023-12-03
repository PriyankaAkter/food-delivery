import React from 'react'
import { SideBar } from './components/SideBar'
import Settings from './components/settings/Settings'

const page = () => {
  return (
    <div className='container flex gap-16 py-16'>
      <SideBar />
      <Settings />
    </div>
  )
}

export default page