"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

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

  // Fetch deposits
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const res = await axios.get("/api/deposit");
        setDeposits(res.data);
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch deposits", );
      }
    };
    fetchDeposits();
  }, []);

  // Approve Deposit Function
  const handleApprove = async (id: string) => {
    try {
      const res = await axios.patch(`/api/deposit?id=${id}`, { approved: true });
      console.log(res)
      setDeposits((prev) =>
        prev.map((deposit) =>
          deposit._id === id ? { ...deposit, approved: true } : deposit
        )
      );
      toast.success("Deposit Approved and User Balance Updated");
    } catch (error) {
        console.log("check Error",error)
      toast.error("Failed to approve deposit");
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<Link href="/admin" className="text-2xl font-bold mb-16">Admin</Link>
      {deposits.map((deposit) => (
        <Card key={deposit._id} className="shadow-lg">
          <CardHeader>
            <CardTitle>Deposit by {deposit.user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Amount: ৳{deposit.amount}</p>
            <p>Method: {deposit.method}</p>
            <p>Transaction ID: {deposit.trx}</p>
            <p>Number: {deposit.user.number}</p>
            <p>Status: {deposit.approved ? "✅ Approved" : "⏳ Pending"}</p>

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
