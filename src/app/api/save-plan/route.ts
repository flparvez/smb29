import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";
import Plan, { IPlan } from "@/models/Plan";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";

// --- POST: Buy a new plan ---
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await connectToDb();

    const body: IPlan = await req.json();
    const { title, price, dailyAds, dailyIncome, validity } = body;

    if (!title || !price || !dailyAds || !dailyIncome || !validity) {
      return new NextResponse(
        JSON.stringify({ error: "All fields (title, price, dailyAds, dailyIncome, validity) are required" }),
        { status: 400 }
      );
    }

    const planData = { title, price, dailyAds, dailyIncome, validity, user: session.user.id };
    const newPlan = await Plan.create(planData);

    const user = await User.findById(session.user.id);
    if (!user || user.balance < price) {
      return new NextResponse(
        JSON.stringify({ error: "Insufficient balance to purchase this plan" }),
        { status: 400 }
      );
    }

    user.balance -= price;
    user.ads = true;
    user.dailyLimit += dailyAds;
    user.planStartedAt = new Date(); // Track when the plan starts
    user.adsWatchedToday = 0; // Reset today's count

    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "Plan purchased successfully", plan: newPlan, remainingBalance: user.balance }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error purchasing plan:", error);
    return new NextResponse(
      JSON.stringify({ error: `Plan purchase failed: ${error}` }),
      { status: 500 }
    );
  }
};

// Get All Plans

export const GET = async () => {
    try {
   
    
        // Connect to MongoDB
        await connectToDb();
    
        // Get all plans created by the user
        const plans = await Plan.find().populate("user");
    
        return new NextResponse(JSON.stringify({ plans }), { status: 200 });
    } catch (error) {
        console.error("Error fetching plans:", error);
        return new NextResponse(
        JSON.stringify({ error: `Error fetching plans: ${error}` }),
        { status: 500 }
        );
    }
}

