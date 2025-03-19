"use client";

import Link from "next/link";
import { useState } from "react";

const CreateAd = () => {
  const [adName, setAdName] = useState("");
  const [adLink, setAdLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/ads", {
        method: "POST",
        body: JSON.stringify({ name: adName, ads_link: adLink }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) alert("Ad created successfully!");
      else alert(`Error: ${data.error}`);
    } catch (error) {
      console.error("Failed to create ad:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <Link href="/admin" className="text-2xl font-bold mb-16">Admin</Link>
      <h1 className="text-2xl font-bold mb-16">Create New Ad</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6  mt-4 rounded-lg shadow-md w-full max-w-md"
      >
        {/* Ad Name */}
        <label className="block text-gray-700 font-medium mb-2">Ad Name</label>
        <input
          type="text"
          value={adName}
          onChange={(e) => setAdName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter Ad Name"
          required
        />

        {/* Ad Link */}
        <label className="block text-gray-700 font-medium mb-2">Ad Link</label>
        <input
          type="url"
          value={adLink}
          onChange={(e) => setAdLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter Ad Link"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full text-white py-2 rounded-md ${
            loading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
          } transition`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Ad"}
        </button>
      </form>
    </div>
  );
};

export default CreateAd;
