"use client"
import { IAds } from '@/models/Ads';

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Plans = () => {

    const [ads, setAds] = useState<IAds[]>([]);

    // Fetch deposits
    useEffect(() => {
      const fetchPlans = async () => {
        try {
          const res = await axios.get("/api/ads/delete-ad");
          setAds(res.data);
        } catch (error) {
          console.log(error)
          toast.error("Failed to fetch deposits", );
        }
      };
      fetchPlans();
    }, []);
  
    // Handle ad deletion
  const handleDelete = async (id:string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/ads/delete-ad?id=${id}`);
      
      toast.success("Ad deleted successfully!");
    } catch (err) {
      console.error("Failed to delete ad:", err);
      toast.error("Failed to delete ad");
    }
  };
    console.log(ads)
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    <Link href="/admin" className="h-14 w-full bg-[#0c0ce8] pl-4 gap-5 shadow text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-7 font-bold cursor-pointer w-7"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            ></path>
          </svg>
          <h2 className="text-xl font-bold">All Ads</h2>
        </Link>
      
        <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Ads List</h2>

      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3 text-left">Ad Name</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {ads.length > 0 ? (
            ads.map((ad) => (
              <tr key={ad._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-3">{ad.name}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-md transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center py-4 text-gray-500">
                No ads found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
        </div>
  )
}

export default Plans
