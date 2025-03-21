"use client";

import { IAds } from "@/models/Ads";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const Task = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [session, status,setError]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);


  // Fetch ads data and handle errors
  const fetchAds = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/ads");
      if (data?.error) {
        setError(data.error); // ✅ Set custom error from backend
        setAds([]); // ✅ Clear ads if error occurs
      } else {
        setAds(data?.ads || []);
        setError(null); // ✅ Reset error on success
      }
    } catch (err) {
      console.error("Failed to fetch ads:", err);
      setError("⚠️ ad limit reached");
    }
  }, [setError]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

    // Show loading or error message
    if (loading) return <p>Loading Ads</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  
    const times= userData?.dailyLimit - userData?.adsWatchedToday
    // slice ads by number
    const newAds = ads.slice(0, times);
   
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">

<Link href="/user/dashboard" className="h-14 w-full bg-[#0c0ce8] pl-4 gap-5 shadow text-white flex items-center">
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
      <h2 className="text-xl font-bold">Ads Dashboard</h2>
    </Link>
      <h1 className="text-2xl font-bold mb-4 text-center">🎯 All Ads</h1>

      {/* ✅ Error Handling UI */}
      {error ? (
        <div className="text-center text-red-500 font-semibold mt-6 animate-pulse">
          {error}
          {toast.error(error)}
        </div>
      ) : newAds?.length > 0 ? (
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
              {newAds?.map((ad,index) => (
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
          
                      className="text-blue-500 hover:underline"
                    >
                      🖱️ View Ad {index + 1}
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
