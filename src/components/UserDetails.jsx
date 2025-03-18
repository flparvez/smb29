"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();

  // Fetch user data by session ID
  const fetchUserData = useCallback(async () => {
    if (status === "loading") return; // Session loading হলে কিছু করবে না

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

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">User Details</h2>
      <Link className="text-xl text-red-600" href="/user/dashboard">Dashboard</Link>
      {userData ? (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Number:</strong> {userData.number}
          </p>
          <p>
            <strong>Balance:</strong> ৳{userData.balance.toFixed(2)}
          </p>
          {/* <p>
            <strong>Role:</strong> {userData.admin ? "Admin" : "User"}
          </p> */}
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
};

export default UserDetails;
