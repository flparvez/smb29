import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";
import Plan, { IPlan } from "@/models/Plan";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";

// --- POST: Create a new plan and deduct price from user balance ---
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Connect to MongoDB
    await connectToDb();

    // Get request body (Plan data)
    const body: IPlan = await req.json();
    const { title, price, dailyAds, dailyIncome, validity } = body;

    // Check if all required fields are provided
    if (!title || !price || !dailyAds || !dailyIncome || !validity) {
      return new NextResponse(
        JSON.stringify({ error: "All fields (title, price, dailyAds, dailyIncome, validity) are required" }),
        { status: 400 }
      );
    }

    // Create new plan with user reference
    const planData = {
      title,
      price,
      dailyAds,
      dailyIncome,
      validity,
      user: session.user.id, // Attach user from session
    };

    const newPlan = await Plan.create(planData);

    // Find the user who is purchasing the plan
    const user = await User.findById(session.user.id); // Get the current logged-in user

    // Check if the user has enough balance to buy the plan
    if (!user || user.balance < price) {
      return new NextResponse(
        JSON.stringify({ error: "Insufficient balance to purchase this plan" }),
        { status: 400 }
      );
    }

    // Decrease plan price from user's balance
    user.balance -= price;
    user.ads = true
    user.dailyLimit = dailyAds
    await user.save();

    // Return success response
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