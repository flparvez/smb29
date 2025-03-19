"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowBigRight } from 'lucide-react';
import Link from "next/link";


const Deposits = () => {
    const [deposit, setDeposit] = useState("");
    const { data: session } = useSession();
     // Fetch user data by session ID
     const fetchUserData = useCallback(async () => {
      
 
  
          const { data } = await axios.get(`/api/deposit`);
          if (Array.isArray(data)) {
            setDeposit(data.filter((d) => d.user._id === session?.user?.id));
          }

        //   filter deposit data by user id
        


     },[session])
    
      useEffect(() => {
        fetchUserData();
      }, [fetchUserData]);
 
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center border border-gray-200 w-full max-w-md mx-auto">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Green Arrow Icon */}
        <Link href="/user/dashboard">  <ArrowBigRight className="text-green-500 w-10 h-10" /></Link>
   
        <div>
          {/* Pending Button */}
          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
           {deposit[0]?.approved ? "Approved" : "Pending"}
          </span>

          {/* Transaction ID */}
          <p className="text-gray-500 text-sm mt-2">TRX ID: {deposit[0]?.trx}</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="text-right">
        {/* Amount */}
        <p className="text-lg font-semibold text-gray-900">{deposit[0]?.amount} Taka</p>

        {/* Date */}
        {new Date(deposit[0]?.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
      </div>
    </div>
    </div>
  )
}

export default Deposits
