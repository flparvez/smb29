"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const UserDetails = () => {
    const { data: session } = useSession();
console.log(session)
  return (
    <div>
      <h1>Name : {session?.user.name}</h1>
    </div>
  )
}

export default UserDetails
