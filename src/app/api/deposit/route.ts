import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";
import Deposit, { IDeposit } from "@/models/Deposit";
import User from "@/models/User";
import Settings from "@/models/setting"; // Import your Settings model
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// --- POST: Create a new deposit ---
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await connectToDb();
    const body: IDeposit = await req.json();

    if (!body.method || !body.amount || !body.trx) {
      return new NextResponse(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const depositData = { ...body, user: session.user.id, approved: false };
    const deposit = await Deposit.create(depositData);

    // Update the stats in the Settings model
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Aggregate total deposits for today
    const totalDepositsToday = await Deposit.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay }, // Filter for today's deposits
          approved: true, // Only approved deposits
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }, // Sum up deposit amounts
        },
      },
    ]);

    const totalDepositAmount = totalDepositsToday[0] ? totalDepositsToday[0].totalAmount : 0;

    // Find the settings document and update
    const settings = await Settings.findOne({});
    if (settings) {
      // Update the today's deposits
      settings.stats.todayDeposits = totalDepositAmount;

      // Update total deposits (keep a running total)
      settings.stats.totalDeposits += body.amount;

      // Save the updated stats
      await settings.save();
    } else {
      return new NextResponse(JSON.stringify({ error: "Settings not found!" }), { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({ message: "Deposit request submitted. Awaiting approval.", deposit }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating deposit:", error);
    return new NextResponse(JSON.stringify({ error: `Deposit creation failed: ${error}` }), { status: 500 });
  }
};





// --- PATCH: Approve deposit & update user balance ---
export const PATCH = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);  
    const id = searchParams.get('id');

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ error: "Invalid deposit ID" }), { status: 403 });
    }

    await connectToDb();
    const deposit = await Deposit.findById(id).populate("user");
    if (!deposit || deposit.approved) {
      return new NextResponse(JSON.stringify({ error: "Invalid or already approved deposit" }), { status: 400 });
    }

    deposit.approved = true;
    await deposit.save();

    const user = await User.findById(deposit.user._id);
    if (user) {
      user.balance += deposit.amount;
      await user.save();
    }

    return new NextResponse(JSON.stringify({ message: "Deposit approved successfully", user }), { status: 200 });
  } catch (error) {
    console.error("Error approving deposit:", error);
    console.log(error)
    return new NextResponse(JSON.stringify({ error: `Deposit approval failed: ${error}` }), { status: 500 });
  }
};

// --- DELETE: Remove a deposit ---
export const DELETE = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid or missing ID" }, { status: 400 });
    }
    await Deposit.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deposit deleted successfully" });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Deposit deletion failed: " + error }), { status: 400 });
  }
};

// --- PUT: Update deposit details ---
export const PUT = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid or missing ID" }, { status: 400 });
    }
    const body: IDeposit = await request.json();
    if (!body.method || !body.amount || !body.trx) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    await connectToDb();
    const deposit = await Deposit.findById(id);
    if (!deposit) {
      return NextResponse.json({ error: "Deposit not found" }, { status: 404 });
    }
    deposit.amount = body.amount;
    deposit.method = body.method;
    deposit.approved = body.approved;
    await deposit.save();
    return NextResponse.json(deposit);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Deposit update failed: " + error }), { status: 400 });
  }
};

// --- GET: Fetch all deposits ---
export const GET = async () => {
  try {
    await connectToDb();
    const deposits = await Deposit.find({}).sort({ createdAt: -1 }).lean().populate("user");
    return new NextResponse(JSON.stringify(deposits), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch deposits: " + error }), { status: 400 });
  }
};
