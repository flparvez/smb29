import Link from 'next/link'
import React from 'react'

const Profile = () => {
  return (
    <div>
            <Link className='text-[#7baa1b] text-xl  font-extrabold ml-6 mt-4' href="/user/dashboard">Go Dashboard</Link>
      <h2>Profile Page</h2>
      
    </div>
  )
}

export default Profile
