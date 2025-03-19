import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";


import { NextRequest, NextResponse } from "next/server";

import Withdraw, { IWithdraw } from "@/models/Withdraw";
import User from "@/models/User";


// --- POST: Create a new withdraw ---
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await connectToDb();
    const body: IWithdraw = await req.json();
    const user = await User.findById(session.user.id);
    if (!body.amount || !body.pmethod || !body.number) {
      return new NextResponse(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }
    if (body.amount < user.balance) {
        return NextResponse.json({ message: 'মিনিমাম উইথড্র 500 টাকা।' }, { status: 400 })
      }
    const withdrawData = { ...body, user: session.user.id, approved: false };
    const withdraw = await Withdraw.create(withdrawData);

    return new NextResponse(
      JSON.stringify({ message: "Withdraw request submitted. Awaiting approval.", withdraw }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating deposit:", error);
    return new NextResponse(JSON.stringify({ error: `Deposit creation failed: ${error}` }), { status: 500 });
  }
};

