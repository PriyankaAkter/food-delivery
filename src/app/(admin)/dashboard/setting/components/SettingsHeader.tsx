import Image from 'next/image'

const SettingsHeader = () => {
  return (
    <div className='grid gap-5'>
        <div className='flex gap-4 items-center'>
        <div className='w-24 h-24 relative'>
            <Image className='rounded-full' src='/assests/images/home/img1.png' alt='restaurant' fill />
        </div>
        <div>
            <h5>Dominos's Pizza</h5>
            <p className='font-medium'>House-1, road-13 Garreb-e-Nawaz Ave, Dhaka 1230</p>
            <p className='font-medium'>0171234567</p>
        </div>
        </div>
        
        <div className='w-full h-[1px] bg-gray-400'></div>
    </div>
  )
}

export default SettingsHeader