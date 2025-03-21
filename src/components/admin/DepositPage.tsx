"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

// Define Deposit type
interface Deposit {
  _id: string;
  amount: number;
  method: string;
  trx: string;
  user: { name: string; number: number };
  approved: boolean;
  createdAt: string;
}

const AdminDepositApproval = () => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);

  // 🚀 Fetch deposits with error handling
  const fetchDeposits = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/deposit");
      setDeposits(data);
    } catch (error) {
      console.error("Failed to fetch deposits:", error);
      toast.error("Failed to fetch deposits.");
    }
  }, []);

  useEffect(() => {
    fetchDeposits();
  }, [fetchDeposits]);

  // ✅ Approve Deposit Function
  const handleApprove = async (id: string) => {
    if (!confirm("Are you sure you want to approve this deposit?")) return;

    try {
      await axios.patch(`/api/deposit?id=${id}`, { approved: true });
      setDeposits((prev) =>
        prev.map((d) => (d._id === id ? { ...d, approved: true } : d))
      );
      toast.success("Deposit approved and user balance updated.");
    } catch (error) {
      console.error("Approval error:", error);
      toast.error("Failed to approve deposit.");
    }
  };

  // 🔥 Calculate Total Approved Amount
  const totalAmount = deposits.reduce(
    (total, d) => (d.approved ? total + d.amount : total),
    0
  );

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* 🔙 Back to Admin Link */}
      <Link
        href="/admin"
        className="h-14 w-full bg-[#0c0ce8] pl-4 gap-5 shadow text-white flex items-center"
      >
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
        <h2 className="text-xl font-bold">Deposit</h2>
      </Link>

      {/* 💰 Total Approved Amount Display */}
      <h2 className="text-2xl font-bold text-center">
        Total Approved Deposits: ৳{totalAmount}
      </h2>

      {/* 📌 Deposit Cards */}
      {deposits.map((deposit) => (
        <Card key={deposit._id} className="shadow-lg">
          <CardHeader>
            <CardTitle>Deposit by {deposit?.user?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold">Amount: ৳{deposit?.amount}</p>
            <p>Method: {deposit?.method}</p>
            <p>Transaction ID: {deposit?.trx}</p>
            <p>Number: 0{deposit?.user?.number}</p>
            <p className="text-gray-500 text-sm font-bold">
              Date:{" "}
              {new Date(deposit?.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p>Status: {deposit.approved ? "✅ Approved" : "⏳ Pending"}</p>

            {/* ✅ Approve Button (if not approved) */}
            {!deposit.approved && (
              <Button
                className="mt-2 bg-green-500 hover:bg-green-600"
                onClick={() => handleApprove(deposit._id)}
              >
                ✅ Approve
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminDepositApproval;
