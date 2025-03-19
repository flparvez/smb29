"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";



const AdminDepositApproval = () => {
 const [withdraw, setWithdraw] = useState();

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
            <Link href="/admin" className="text-2xl font-bold mb-16">Admin</Link>
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
