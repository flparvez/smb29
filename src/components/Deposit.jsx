"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";


// ✅ Component শুরু
const DepositPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ ইউজার ডেটা ফেচ করার ফাংশন
  const fetchUserData = useCallback(async () => {
    if (status === "loading") return; // সেশন লোডিং হলে কিছু করবে না

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

  // ✅ লোডিং আর এরর হ্যান্ডলিং
  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // ✅ পরিমাণ সিলেক্ট করার হ্যান্ডলার
  const handleSelectAmount = (amount) => setSelectedAmount(amount);

  // ✅ পেমেন্ট মেথড সিলেক্ট করার হ্যান্ডলার
  const handleSelectMethod = (method) => setSelectedMethod(method);

  // ✅ সাবমিট করার হ্যান্ডলার
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAmount || !selectedMethod) {
      toast.error("Please select an amount and a payment method!");
      return;
    }

    localStorage.setItem("selectedAmount", selectedAmount);
    localStorage.setItem("selectedMethod", JSON.stringify(selectedMethod));
    router.push("/user/deposit/manual");
  };

  const paymentMethods = [
    {
      id: 12,
      name: "Bkash",
      image:
        "https://tshop29.com/assets/images/gateway/66571c564ca4a1716984918.png",
      alias: "bkash",
    },
    {
      id: 13,
      name: "Nagad",
      image:
        "https://tshop29.com/assets/images/gateway/66571c9fbfa491716984991.png",
      alias: "nagad",
    },
    {
      id: 14,
      name: "Rocket",
      image:
        "https://tshop29.com/assets/images/gateway/66571cd0149f91716985040.jpeg",
      alias: "rocket",
    },
  ];

  return (
    <div className="min-h-screen bg-[#ebebeb] pb-10">
      {/* ✅ হেডার */}
      <Link
        href="/user/dashboard"
        className="h-14 w-full bg-[#0c0ce8] pl-4 gap-5 shadow text-white flex items-center"
      >
        <h2 className="text-xl font-bold">Deposit</h2>
      </Link>

      {/* ✅ ইউজার ব্যালেন্স */}
      <div className="flex gap-3 items-center justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
        <h2 className="text-xl">Balance:</h2>
        <h2 className="text-[#0c0ce8] text-xl font-bold">৳ {userData?.balance}</h2>
      </div>

      {/* ✅ ফর্ম */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount সিলেকশন */}
        <div className="flex flex-col items-center justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
          <h2 className="mb-3 text-xl">Amount</h2>
          <div className="mt-5 flex justify-center gap-3 flex-wrap">
            {[500, 1000, 2000, 3000, 5000, 9000, 15000, 18000, 25000].map(
              (amount) => (
                <div
                  key={amount}
                  onClick={() => handleSelectAmount(amount)}
                  className={`relative grid items-center font-bold uppercase border py-1.5 px-3 text-xs rounded-lg cursor-pointer ${
                    selectedAmount === amount
                      ? "bg-blue-500 text-white"
                      : "border-blue-500 text-blue-700"
                  }`}
                >
                  <span>{amount}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* ✅ পেমেন্ট মেথড সিলেকশন */}
        <div className="flex flex-col items-center justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
          <h2 className="mb-3 text-lg">Select Payment Method</h2>
          <div className="flex gap-5">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handleSelectMethod(method)}
                className={`p-3 cursor-pointer border-4 rounded-lg ${
                  selectedMethod?.id === method.id
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <img src={method.image} alt={method.name} className="h-8 w-8 mx-auto" />
                <h2 className="text-[#0c0ce8] text-sm font-bold">{method.name}</h2>
              </div>
            ))}
          </div>
          {selectedMethod && (
            <p className="mt-3 text-green-500">
              You selected {selectedMethod.name}
            </p>
          )}
        </div>

        {/* ✅ সাবমিট বাটন */}
        <div className="m-5">
          <button
            type="submit"
            className="w-full text-white bg-[#0c0ce8] py-3 px-6 rounded-full font-bold uppercase hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepositPage;
