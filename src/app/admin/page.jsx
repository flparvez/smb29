"use client";


import Stats from "@/components/admin/Stats";
import { useFetchData } from "@/lib/useFetchData";
import Link from "next/link";

const AdminDashboard = () => {

    const { data, loading, error, refetch } = useFetchData("/api/setting", { revalidate: true });

    if (loading) return <p>Loading settings...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Stats Cards */}
  <Stats setting ={data?.stats} />
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
