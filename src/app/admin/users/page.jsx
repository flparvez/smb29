"use client"
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Users = () => {
const [User, setUser] = useState("");
const [loading, setLoading] = useState(true);
// Fetch Users Data
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/auth/register");
      setUser(data?.user);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchUsers();
}, []);

  return (
<div>
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
      <h2 className="text-xl font-bold">All Users</h2>
    </Link>
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#7baa1b]">
        🛠️ Admin Dashboard - User Panel
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading users... ⏳</p>
      ) : User.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-[#7baa1b] text-white">
              <tr>
                <th className="p-2 border border-gray-300">Name</th>
                <th className="p-2 border border-gray-300">Number</th>
                <th className="p-2 border border-gray-300">Balance (৳)</th>
                <th className="p-2 border border-gray-300">Ads Watched Today</th>
                <th className="p-2 border border-gray-300">Created At</th>
              </tr>
            </thead>
            <tbody>
              {User.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-2 text-center border border-gray-300">
                    {user.name}
                  </td>
                  <td className="p-2 text-center border border-gray-300">
                    {user.number}
                  </td>
                  <td className="p-2 text-center border border-gray-300 font-bold text-green-500">
                    ৳{user.balance}
                  </td>
                  <td className="p-2 text-center border border-gray-300">
                    {user.adsWatchedToday}
                  </td>
                  <td className="p-2 text-center border border-gray-300 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No users found 😞</p>
      )}
    </div>
</div>
  )
}

export default Users
