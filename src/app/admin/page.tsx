"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
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

  const goToCreateAd = () => router.push("/admin/create-ad");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Cards */}
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

      {/* Create Ad Button */}
      <button
        onClick={goToCreateAd}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        ➕ Create New Ad
      </button>
    </div>
  );
};

export default AdminDashboard;
