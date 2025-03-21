"use client";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminDepositApproval = () => {
  const [withdraws, setWithdraws] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔒 Check Admin Access
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.admin) {
      toast.error("You are not authorized to access this page.");
      router.push("/user/dashboard");
    }
  }, [session, status, router]);

  // 💰 Fetch Withdrawals Data
  const fetchWithdraws = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/withdraw");
      setWithdraws(data);
    } catch (error) {
      console.error("Failed to fetch withdrawals:", error);
      toast.error("Failed to fetch withdrawals.");
    }
  }, []);

  useEffect(() => {
    fetchWithdraws();
  }, [fetchWithdraws]);

  // ✅ Approve Withdrawal
  const handleApprove = async (id) => {
    if (!confirm("Are you sure you want to approve this withdrawal?")) return;

    try {
      await axios.patch(`/api/withdraw?id=${id}`, { approved: true });
      setWithdraws((prev) =>
        prev.map((w) => (w._id === id ? { ...w, approved: true } : w))
      );
      toast.success("Withdrawal approved and user balance updated.");
    } catch (error) {
      console.error("Approval error:", error);
      toast.error("Failed to approve withdrawal.");
    }
  };

  // 🔥 Calculate Total Approved Amount
  const totalAmount = withdraws
    ?.filter((w) => w.approved)
    ?.reduce((total, w) => total + w.amount, 0);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <h2 className="text-xl font-bold">Withdraw</h2>
      </Link>

      <h2 className="text-2xl font-bold text-center">
        Total Approved Withdrawal: ৳{totalAmount}
      </h2>

      {withdraws?.map((w) => (
        <Card key={w._id} className="shadow-lg">
          <CardHeader>
            <CardTitle>Withdraw for {w?.user?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold">Amount: ৳{w?.amount}</p>
            <p>Method: {w?.pmethod}</p>
            <p className="text-xl">Payment Number: 0{w?.number}</p>
            <p>Status: {w.approved ? "✅ Approved" : "⏳ Pending"}</p>
            <p className="text-gray-500 text-sm font-bold">
              {new Date(w?.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            {!w.approved && (
              <Button
                className="mt-2 bg-green-500 hover:bg-green-600"
                onClick={() => handleApprove(w._id)}
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
