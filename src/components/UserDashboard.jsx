"use client"
import HeaderNavbar from '@/components/Header'
import ResponsiveItems from '@/components/ServiceList'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

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
      const admin = session?.user?.admin;

        const contacts = [
          { name: "TikTok", imgSrc: "https://i.ibb.co/6xjgGrX/image.png", link: "#" },
          { name: "Whatsapp", imgSrc: "https://i.ibb.co/Y70yGNsW/image.png", link: "#" },
          { name: "YouTube", imgSrc: "https://i.ibb.co/84gGv0kk/image.png", link: "#", target: "_blank" },
          { name: "Telegram", imgSrc: "https://i.ibb.co/0V9LWf7W/image.png", link: "#" },
        ];
  return (
    <div className='container mx-auto '>
   
    <HeaderNavbar admin={admin} />
    
  {/* banner image */}
  <Image src="https://i.ibb.co.com/rGVMNhL5/image.png" alt="banner" width={1000} height={300} />
  
  <ResponsiveItems />
  <div className="border border-gray-300 rounded-lg mt-5">
      <h2 className="p-3 text-[#0c0ce8] text-xl font-bold">Contact</h2>
      <hr className="border-gray-300" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 rounded-lg my-4">
        {contacts.map((contact, index) => (
          <Link
            key={index}
            href={contact.link}
         
          >
            <div className="cursor-pointer flex items-center flex-col">
              <img
                alt={contact.name}
                src={contact.imgSrc}
                
                className="h-10 w-10"
              />
              <h2 className="text-black mt-2 text-center">{contact.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
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
