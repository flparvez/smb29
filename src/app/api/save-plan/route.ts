import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";
import Plan, { IPlan } from "@/models/Plan";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";


// --- POST: Create a new plan ---
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
    const { dailyAds,dailyIncome,price,title,user,validity } = body;

    // Check if all required fields are provided
    if (!body.title || !body.price || !body.dailyAds || !body.dailyIncome || !body.validity) {
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
      user: session.user.id,
      
      // Attach user from session
    };

    const newPlan = await Plan.create(planData);
    const Planuser = await User.findById(user._id);
    if (Planuser) {
      Planuser.balance -= price;
      await Planuser.save();
    }
    // Return success response
    return new NextResponse(
      JSON.stringify({ message: "Plan created successfully", plan: newPlan }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating plan:", error);
    return new NextResponse(
      JSON.stringify({ error: `Plan creation failed: ${error}` }),
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
        const plans = await Plan.find()
    
        return new NextResponse(JSON.stringify({ plans }), { status: 200 });
    } catch (error) {
        console.error("Error fetching plans:", error);
        return new NextResponse(
        JSON.stringify({ error: `Error fetching plans: ${error}` }),
        { status: 500 }
        );
    }
}