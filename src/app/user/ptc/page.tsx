"use client";

import { IAds } from "@/models/Ads";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

const Task = () => {
  const [ads, setAds] = useState([]);

  // Fetch ads data
  const fetchAds = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/ads");
      setAds(data?.ads);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">📌 All Ads</h1>

      {ads.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-2 border border-gray-300">#</th>
                <th className="p-2 border border-gray-300">Ad Name</th>
                <th className="p-2 border border-gray-300">Ad Link</th>
                
              </tr>
            </thead>
            <tbody>
              {ads.map((ad: IAds, index: number) => (
                <tr
                  key={ad._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-2 text-center border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="p-2 text-center border border-gray-300">
                    {ad.name}
                  </td>
                  <td className="p-2 text-center border border-gray-300">
                    <Link
                      href={`/user/ptc/${ad._id}`} 
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      ads {index + 1}
                    </Link>
                  </td>
            
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No Ads Found 🥲</p>
      )}
    </div>
  );
};

export default Task;
