import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, number, password, refer } = await request.json();

    // Basic Validation
    if (!number || !password) {
      return NextResponse.json(
        { error: "Number and Password are required" },
        { status: 401 }
      );
    }

    // Connect to DB
    await connectToDb();

    // Check if user already exists
    const existingUser = await User.findOne({ number });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 403 }
      );
    }

    // Prepare new user data
    const newUserData = {
      name,
      number,
      password,
      referredBy: null,
    };

    // Handle Referral (if provided)
    if (refer) {
      const referrer = await User.findById(refer);

      if (referrer) {
        newUserData.referredBy = referrer._id;

        // Reward the referrer
        referrer.balance += 10; // 🎁 Reward 10 Taka
        referrer.refer += 1; // ➕ Increment referral count
        await referrer.save();
      } else {
        return NextResponse.json(
          { error: "Invalid referral code" },
          { status: 400 }
        );
      }
    }

    // Create the new user
    const newUser = await User.create(newUserData);

    return NextResponse.json(
      { message: "User Registered Successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}

export async function GET(){
    connectToDb()

    const user = await User.find().sort({createdAt:-1}).lean();
    return NextResponse.json({user})
}