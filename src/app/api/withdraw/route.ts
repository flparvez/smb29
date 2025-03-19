import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Withdraw from "@/models/Withdraw";
import User from "@/models/User";

// POST API route for withdrawal
export const POST = async (req: NextRequest) => {
  try {
    // Check user session
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Connect to the database
    await connectToDb();
    const body = await req.json();

    // Validate user data
    const user = await User.findById(session.user.id);
    if (!body.amount || !body.pmethod || !body.number) {
      return new NextResponse(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // Check minimum withdrawal amount
    if (body.amount < 500) {
      return NextResponse.json({ message: "মিনিমাম উইথড্র 500 টাকা।" }, { status: 400 });
    }

    // Ensure user has enough balance
    if (body.amount > user.balance) {
      return NextResponse.json({ message: "আপনার ব্যালেন্স যথেষ্ট নয়।" }, { status: 400 });
    }

    // Create the withdrawal request
    const withdrawData = { ...body, user: session.user.id, approved: false };
    const withdraw = await Withdraw.create(withdrawData);

    // Deduct the balance from the user
    user.balance -= body.amount;
    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "Withdraw request submitted. Awaiting approval.", withdraw }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating withdrawal:", error);
    return new NextResponse(JSON.stringify({ error: `Withdrawal creation failed: ${error}` }), {
      status: 500,
    });
  }
};
