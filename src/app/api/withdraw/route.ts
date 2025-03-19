import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Withdraw from "@/models/Withdraw";
import User from "@/models/User";
import mongoose from "mongoose";

// POST API route for withdrawal
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "অনুমোদন নেই!" }, { status: 401 });
    }

    await connectToDb();
    const { amount, pmethod, number } = await req.json();

    // Validate user data
    const user = await User.findById(session.user.id);
    if (!amount || !pmethod || !number) {
      return NextResponse.json({ error: "সবগুলো ফিল্ড পূরণ করতে হবে!" }, { status: 401 });
    }

    // Check minimum withdrawal amount
    if (amount < 500) {
      return NextResponse.json({ message: "মিনিমাম উইথড্র 500 টাকা।" }, { status: 402 });
    }

    // Ensure user has enough balance
    if (amount > user.balance) {
      return NextResponse.json({ message: "আপনার ব্যালেন্স যথেষ্ট নয়।" }, { status: 403 });
    }

    // Create the withdrawal request
    const withdrawData = { user: session.user.id, amount, pmethod, number, approved: false };
    const withdraw = await Withdraw.create(withdrawData);

    // Deduct the balance from the user
    user.balance -= amount;
    await user.save();

    return NextResponse.json(
      { message: "✅ উইথড্র সফলভাবে সাবমিট হয়েছে! অনুমোদনের অপেক্ষায়...", withdraw },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating withdrawal:", error);
    return NextResponse.json({ error: `⚠️ উইথড্রাল ফেইল্ড: ${error}` }, { status: 500 });
  }
};





// --- PATCH: Approve Withdraw & update user balance ---
export const PATCH = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);  
    const id = searchParams.get('id');

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ error: "Invalid withdraw ID" }), { status: 403 });
    }

    await connectToDb();
    const withdraw = await Withdraw.findById(id).populate("user");
    if (!withdraw || withdraw.approved) {
      return new NextResponse(JSON.stringify({ error: "Invalid or already approved deposit" }), { status: 400 });
    }

    withdraw.approved = true;
    await withdraw.save();

    
    return new NextResponse(JSON.stringify({ message: "withdraw approved successfully", withdraw }), { status: 200 });
  } catch (error) {
    console.error("Error approving deposit:", error);
    console.log(error)
    return new NextResponse(JSON.stringify({ error: `withdraw approval failed: ${error}` }), { status: 500 });
  }
};


//  GEt withdraw
export const GET = async () => {
  try {
    await connectToDb();
    const withdraws = await Withdraw.find({}).sort({ createdAt: -1 }).lean().populate("user");
    return new NextResponse(JSON.stringify(withdraws), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch withdraws: " + error }), { status: 400 });
  }
};