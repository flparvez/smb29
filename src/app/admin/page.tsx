"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAds: 0,
    activePlans: 0,
    earnings: 0,
  });

  useEffect(() => {
    // Sample stats fetch (Backend API setup needed)
    setStats({
      totalUsers: 120,
      totalAds: 35,
      activePlans: 70,
      earnings: 10230,
    });
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: stats.totalUsers, color: "bg-blue-500" },
          { label: "Total Ads", value: stats.totalAds, color: "bg-yellow-500" },
          { label: "Active Plans", value: stats.activePlans, color: "bg-green-500" },
          { label: "Total Earnings", value: `$${stats.earnings}`, color: "bg-purple-500" },
        ].map((card, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg text-white ${card.color} shadow-md`}
          >
            <h2 className="text-xl font-semibold">{card.label}</h2>
            <p className="text-3xl mt-1 font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons (Deposit, Withdraw, Create Ad) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link
          href="/admin/deposit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          💰 Deposit
        </Link>
        <Link href="/admin/withdraw"
          
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          💸 Withdraw
        </Link>
        <Link
          href="/admin/setting"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Setting
        </Link>

              <Link
          href="/admin/users"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          All Users
        </Link>

        
     <Link
          href="/admin/create-ad"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          ➕ Create New Ad
        </Link>

     <Link
          href="/admin/ads"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          All Ads
        </Link>


      </div>
    </div>
  );
};

export default AdminDashboard;
