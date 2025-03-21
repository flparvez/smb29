"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditUser = ({ userId }) => {
  const [userData, setUserData] = useState({
    name: "",
    number: "",
    planStartedAt: "",
    admin: false, // ✅ Default admin is false
    balance: 0,
    dailyLimit: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // 🔍 Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/auth/user?id=${userId}`);
        const data = await response.json();
        if (data) {
          setUserData({
            name: data.name,
            number: data.number,
            planStartedAt: data.planStartedAt,
            admin: data.admin,
            balance: data.balance,
            dailyLimit: data.dailyLimit,
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [userId]);

  // ✏️ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 🔥 Admin Toggle with Password Confirmation
  const handleAdminToggle = async () => {
    const password = prompt("🔐 Enter Admin Confirmation Password:");

    // Check if password is correct
    if (password === "smb29p") {
      const newAdminStatus = !userData.admin; // Toggle admin status
      const updatedUserData = { ...userData, admin: newAdminStatus };

      setUserData(updatedUserData);

      try {
        const response = await fetch(`/api/auth/register?id=${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(
            newAdminStatus ? "✅ Admin access granted!" : "❌ Admin access removed."
          );
        } else {
          toast.error(data.error || "⚠️ Failed to update admin status.");
        }
      } catch (err) {
        console.error("Error updating admin status:", err);
        toast.error("❗ Error updating admin status.");
      }
    } else {
      toast.error("🚫 Invalid password. Operation canceled.");
    }
  };

  // 🛠️ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/auth/register?id=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User updated successfully!");
        router.push("/admin/users"); // Redirect to user list
      } else {
        setError(data.error || "Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center">Edit User Details</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Number
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={userData.number}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
            Balance
          </label>
          <input
            type="number"
            id="balance"
            name="balance"
            value={userData.balance}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dailyLimit" className="block text-sm font-medium text-gray-700">
            Daily Limit
          </label>
          <input
            type="number"
            id="dailyLimit"
            name="dailyLimit"
            value={userData.dailyLimit}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          {userData?.planStartedAt ? (
            <h2>
              Plan started at:{" "}
              {new Date(userData?.planStartedAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </h2>
          ) : (
            <h2 className="text-red-500">No plan started</h2>
          )}
        </div>

        {/* 🔥 Admin Toggle */}
        <div className="mb-4 flex items-center">
          <label htmlFor="admin" className="block text-sm font-medium text-gray-700 mr-4">
            Admin Status
          </label>
          <input
            type="checkbox"
            id="admin"
            name="admin"
            checked={userData.admin}
            onChange={handleAdminToggle}
            className="h-5 w-5 cursor-pointer"
          />
          <span className="ml-2 text-sm">
            {userData.admin ? "✅ Admin" : "❌ Not Admin"}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded bg-blue-500 text-white ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
