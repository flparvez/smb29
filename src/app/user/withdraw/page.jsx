"use client";
import getUserData from "@/lib/getUserData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [pmethod, setPmethod] = useState("");
  const [number, setNumber] = useState("");

  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const data = await getUserData(session?.user.id);
          setUserData(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchData();
  }, [session, status]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!userData) return <p>Loading user data...</p>;

 
const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !pmethod || !number) {
      toast.error("❌ সবগুলো ফিল্ড পূরণ করুন!");
      return;
    }

    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount:amount, pmethod:pmethod, number:number }),
        
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`✅ উইথড্র সফল হয়েছে! ${number} Taka প্রদান করা হয়েছে!`);
        
        setAmount("");
        setPmethod("");
        setNumber("");
        router.push("/user/transactions");
       
      } else {
        toast.error(data.message || " কিছু একটা সমস্যা হয়েছে!");
      }
    } catch (err) {
      console.log(err);
      toast.error(" সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি!");
    }
  };

  return (
    <div className="min-h-screen bg-[#ebebeb] pb-10">
      <a href="/user/dashboard" className="h-14 w-full bg-[#0c0ce8] pl-4 gap-5 shadow text-white flex items-center">
        <h2 className="text-xl font-bold">Withdraw</h2>
      </a>

      <div className="flex gap-3 items-center justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
        <h2 className="text-xl">Balance:</h2>
        <h2 className="text-[#0c0ce8] text-xl font-bold">{userData?.balance} Taka</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
        <h2 className="mb-3 text-lg font-bold">Enter Withdrawal Details</h2>

        <input type="number" placeholder="Amount (Min 500)" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border mb-3 rounded" />

        <select value={pmethod} onChange={(e) => setPmethod(e.target.value)} className="w-full p-2 border mb-3 rounded">
          <option value="">Select Payment Method</option>
          <option value="nagad">Nagad</option>
          <option value="bkash">Bkash</option>
        </select>

        <input type="text" placeholder="Your Number" value={number} onChange={(e) => setNumber(e.target.value)} className="w-full p-2 border mb-3 rounded" />

        <button type="submit" className="bg-[#0c0ce8] text-white font-bold py-2 px-4 rounded mt-2 hover:bg-blue-700">
          Submit Withdraw
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
