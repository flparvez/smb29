"use client"
import React from 'react'
import UserDetails from './UserDetails'
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Homepage = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p>Loading...</p>
    }
    if (session) {
        return (
            <div>
              <UserDetails />
            </div>
          )
    }else{
        return   <div>
                  <Link href="/login">Login Now</Link>
                </div>
    }

}

export default Homepage
