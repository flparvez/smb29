import HeaderNavbar from '@/components/Header'
import ResponsiveItems from '@/components/ServiceList'
import Image from 'next/image'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='container mx-auto '>
        <HeaderNavbar />
      {/* banner image */}
      <Image src="/banner.webp" alt="banner" width={1000} height={300} />
    
      <ResponsiveItems />

      {/* how to work */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-300 flex items-center">
<div>
<Image src="/youtube.webp" alt="how to work"className="max-w-[250px]" width={100} height={100} />
</div>
<div>
    <h2 className='text-xl font-bold'>How To Work</h2>
    <h2>Click here to see youtube video tutorial</h2>
</div>
      </div>
    </div>
  )
}

export default Dashboard
