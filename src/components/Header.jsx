"use client"
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function HeaderNavbar({admin}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

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
  

  // Toggle balance visibility
  const toggleBalance = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <header className="w-full bg-[#7baa1b] py-4 px-6 flex items-center justify-between">
      {/* Left Side: Profile Picture, Name, and Toggle Button */}
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
          <Image width={100} height={100} src="/profileu.webp" alt="Profile" className="w-full h-full object-cover" />
        </div>
        {
      admin ? <Link href={"/admin"} className="text-[#7baa1b] text-xl  font-extrabold ml-6 mt-4">Admin</Link> : ""
    }
        <div className="flex flex-col items-start">
          {/* Name */}
          <span className="text-white text-xl mb-1">{userData?.name}</span>

          {/* Toggle Button: "Tap to Balance" */}
          <button 
            onClick={toggleBalance} 
            className="bg-[#fff]  text-sm px-1 text-[#444] rounded-full cursor-pointer flex items-center gap-1"
          >
            {isBalanceVisible ? <p className="font-bold">balance ৳ {userData?.balance} </p> : <div className=" flex items-center gap-1"><Image
                    src="/tap.webp" width={20} height={20} alt="" className="h-4 rounded-full w-4" /> <span id="textContent">Tap for Balance</span> 
                    </div>}
          </button>
        </div>
      </div>

      {/* Right Side: Logout Icon */}
      <div className="flex items-center">
        <button  onClick={() => signOut()}
          className="rounded-full bg-white absolute top-3 right-3 p-2"
          aria-label="Logout"
        >
          
       <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            className="h-6 font-bold cursor-pointer w-6 text-black">
            <path fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                clipRule="evenodd"></path>
        </svg>
        </button>
      </div>
    </header>
  );
}
