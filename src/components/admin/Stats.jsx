"use client"
import { useFetchData } from '@/lib/useFetchData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Stats = ({setting}) => {

   
    const { data, loading, error, refetch } = useFetchData("/api/auth/register", { revalidate: true });

    const userCount = data?.user?.length
  
      if (loading) return <p>Loading settings...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    {[
      { label: "Total Users", value: userCount, color: "bg-blue-500", "href": "/admin/users" },
      { label: "Today Deposits", value: setting?.todayDeposits + " Tk", color: "bg-yellow-500","href": "/admin/deposit" },
      { label: "Today Withdraw", value: setting?.todayWithdrawals + " Tk", color: "bg-green-500","href": "/admin/withdraw" },
     
    ].map((card, index) => (
      <div
        key={index}
        className={`p-4 rounded-lg text-white ${card.color} shadow-md`}
      >
        <Link href={card.href}>
        <h2 className="text-xl font-semibold">{card.label}</h2>
        <p className="text-3xl mt-1 font-bold">{card.value}</p>
        </Link>
      </div>
    ))}
  </div>

  )
}

export default Stats
