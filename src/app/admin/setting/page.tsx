"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    title: "",
    description: "",
    logo: "",
    paymentMethods: { bkash: "", nagad: "" },

  });

  const [loading, setLoading] = useState(false);

  // 🛠️ Fetch existing settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get("/api/setting");
        setSettings(data);
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    };
    fetchSettings();
  }, []);

  // ✅ Handle form submit & save settings
  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch("/api/setting", settings);
      alert("Settings updated successfully!");
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Failed to update settings.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white shadow-md max-w-md mx-auto">
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
      <h2 className="text-xl font-bold">Setting</h2>
    </Link>
      <h2 className="text-xl font-bold mb-4">Admin Settings</h2>

      <label className="block mb-2 font-medium">Website Title:</label>
      <input
        type="text"
        placeholder="Enter Website Title"
        value={settings.title}
        onChange={(e) => setSettings({ ...settings, title: e.target.value })}
        className="w-full p-2 mb-2 border"
      />

      <label className="block mb-2 font-medium">Website Description:</label>
      <input
        type="text"
        placeholder="Enter Website Description"
        value={settings.description}
        onChange={(e) => setSettings({ ...settings, description: e.target.value })}
        className="w-full p-2 mb-2 border"
      />

      <label className="block mb-2 font-medium">Logo URL:</label>
      <input
        type="text"
        placeholder="Enter Logo URL"
        value={settings.logo}
        onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
        className="w-full p-2 mb-2 border"
      />

      <h3 className="font-bold mt-4">Payment Methods</h3>
      <label className="block mt-2">Bkash Number:</label>
      <input
        type="text"
        placeholder="Enter Bkash Number"
        value={settings?.paymentMethods?.bkash}
        onChange={(e) =>
          setSettings({ ...settings, paymentMethods: { ...settings.paymentMethods, bkash: e.target.value } })
        }
        className="w-full p-2 mb-2 border"
      />

      <label className="block mt-2">Nagad Number:</label>
      <input
        type="text"
        placeholder="Enter Nagad Number"
        value={settings?.paymentMethods?.nagad}
        onChange={(e) =>
          setSettings({ ...settings, paymentMethods: { ...settings?.paymentMethods, nagad: e.target.value } })
        }
        className="w-full p-2 mb-2 border"
      />

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white w-full p-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}
