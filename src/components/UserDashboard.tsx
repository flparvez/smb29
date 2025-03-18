"use client"
import HeaderNavbar from '@/components/Header'
import ResponsiveItems from '@/components/ServiceList'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'
const UserDashboard = () => {
  const { data: session } = useSession();
    const router = useRouter();
      // Use useEffect to handle redirect after component render
      useEffect(() => {
        if (!session) {
          router.push('/');
        }
      }, [session, router]);
    
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

export default UserDashboard
