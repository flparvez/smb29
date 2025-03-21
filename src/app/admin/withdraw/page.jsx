"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";



const AdminDepositApproval = () => {
 const [withdraw, setWithdraw] = useState();
//  filter approved deposits amount total
const approvedwithdraw = withdraw?.filter((withdraw) => withdraw.approved);
// totol amount
const totalAmount = approvedwithdraw?.reduce((total, withdraw) => total + withdraw.amount, 0);


  // Fetch deposits
  useEffect(() => {
    const fetchwithdraw = async () => {
      try {
        const res = await axios.get("/api/withdraw");
        setWithdraw(res.data);
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch deposits", );
      }
    };
    fetchwithdraw();
  }, []);

  // Approve Deposit Function
  const handleApprove = async (id) => {
    // are you confirmed
    if (!confirm(`Are you sure you want to approve the withdraw?`)) {
        return;
      }
    try {
      const res = await axios.patch(`/api/withdraw?id=${id}`, { approved: true });
      console.log(res)
      setWithdraw((prev) =>
        prev.map((withdraw) =>
            withdraw._id === id ? { ...withdraw, approved: true } : withdraw
        )
      );
      toast.success("withdraw Approved and User Balance Updated");
    } catch (error) {
        console.log("check Error",error)
      toast.error("Failed to approve withdraw");
    }
  };

  return (
    
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <h2 className="text-xl font-bold">Withdraw</h2>
    </Link>
    <h2 className="text-2xl font-bold text-center">Total Approve Withdrawal: ৳{totalAmount}</h2>
      {withdraw?.map((withdraw) => (
        <Card key={withdraw._id} className="shadow-lg">
          <CardHeader>
            <CardTitle>Withdraw for {withdraw?.user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold">Amount: ৳{withdraw?.amount}</p>
            <p>Method: {withdraw?.pmethod}</p>
          
            <p className="text-xl">Payment Number: 0{withdraw?.number}</p>
            <p>Status: {withdraw.approved ? "✅ Approved" : "⏳ Pending"}</p>
            <p className="text-gray-500 text-sm font-bold">
              {new Date(withdraw?.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            {!withdraw.approved && (
              <Button
                className="mt-2 bg-green-500 hover:bg-green-600"
                onClick={() => handleApprove(withdraw._id)}
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
