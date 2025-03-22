"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
   const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { data: session, status } = useSession();


    // Fetch user data by session ID
    const fetchUserData = useCallback(async () => {
      if (status === "loading") return; // Session loading
  
      if (!session?.user?.id) {
        setError("User not found");
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/auth/user?id=${session.user.id}`);
        setUserData(data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user data");
        toast.error("Could not load user details");
      } finally {
        setLoading(false);
      }
    }, [session, status]);
  
    useEffect(() => {
      fetchUserData();
    }, [fetchUserData]);
  
    // Show loading or error message
    if (loading) return <p>Loading user data...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  

  return (
    <div className='min-h-screen bg-[#ebebeb] pb-10'>
       <Link href="/user/dashboard" className="h-14 w-full bg-[#0c0ce8] pl-4  gap-5 shadow text-white flex items-center "><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            className="h-7 font-bold cursor-pointer w-7">
            <path fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clipRule="evenodd"></path>
        </svg>
        <h2 className="text-xl font-bold">Profile </h2>
    </Link>
      



    <div className="bg-white m-5 rounded-lg overflow-hidden">
  <div className="flex p-4 bg-white items-center gap-2 border-b border-t border-gray-100">
    <span className="bg-[#0c0ce8] p-1 rounded-full text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 cursor-pointer w-5 ">
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
      </svg>
    </span>
    Name: {userData?.name}
  </div>

  <div className="flex p-4 bg-white items-center gap-2 border-b border-gray-100">
    <span className="bg-[#0c0ce8] p-1 rounded-full text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 cursor-pointer w-5 ">
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"></path>
      </svg>
    </span>
    Mobile Number: 0{userData?.number}
  </div>

  <div className="flex p-4 bg-white items-center gap-2 border-b border-gray-100">
    <span className="bg-[#0c0ce8] p-1 rounded-full text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 cursor-pointer w-5 ">
        <path fillRule="evenodd" d="M12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.615 2.25 12s4.365 9.75 9.75 9.75zM10.5 7.963a1.5 1.5 0 00-2.17-1.341l-.415.207a.75.75 0 00.67 1.342L9 7.963V9.75h-.75a.75.75 0 100 1.5H9v4.688c0 .563.26 1.198.867 1.525A4.501 4.501 0 0016.41 14.4c.199-.977-.636-1.649-1.415-1.649h-.745a.75.75 0 100 1.5h.656a3.002 3.002 0 01-4.327 1.893.113.113 0 01-.045-.051.336.336 0 01-.034-.154V11.25h5.25a.75.75 0 000-1.5H10.5V7.963z" clipRule="evenodd"></path>
      </svg>
    </span>
    Main Balance: {userData?.balance} Taka
  </div>

  <div className="flex p-4 bg-white items-center gap-2 border-b border-gray-100">
    <span className="bg-[#0c0ce8] p-1 rounded-full text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 cursor-pointer w-5 ">
        <path fillRule="evenodd" d="M12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.615 2.25 12s4.365 9.75 9.75 9.75zM10.5 7.963a1.5 1.5 0 00-2.17-1.341l-.415.207a.75.75 0 00.67 1.342L9 7.963V9.75h-.75a.75.75 0 100 1.5H9v4.688c0 .563.26 1.198.867 1.525A4.501 4.501 0 0016.41 14.4c.199-.977-.636-1.649-1.415-1.649h-.745a.75.75 0 100 1.5h.656a3.002 3.002 0 01-4.327 1.893.113.113 0 01-.045-.051.336.336 0 01-.034-.154V11.25h5.25a.75.75 0 000-1.5H10.5V7.963z" clipRule="evenodd"></path>
      </svg>
    </span>
    Deposit Balance: {userData.balance -100} Taka
  </div>

  <div className="flex p-4 bg-white items-center gap-2 border-b border-gray-100">
    <span className="bg-[#0c0ce8] p-1 rounded-full text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 cursor-pointer w-5 ">
        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"></path>
      </svg>
    </span>
    Refer Code: {userData?._id.toString()}
  </div>

  <div className="flex p-4 bg-white items-center gap-2 border-b border-gray-100">
    <span className="bg-[#0c0ce8] p-1 rounded-full text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 cursor-pointer w-5 ">
        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a4.125 4.125 0 110 8.25 4.125 4.125 0 010-8.25zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0z"></path>
      </svg>
    </span>
    Total Refer: {userData?.referc}
  </div>
</div>




    </div>
  )
}

export default Profile
