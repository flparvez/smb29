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
        referrer.referc += 1; // ➕ Increment referral count
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






export async function PATCH(request: NextRequest) {
  try {
    // Get user ID from the query parameter
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const { name, number, balance, dailyLimit } = await request.json();

    // Basic Validation
    if (!name && !number ) {
      return NextResponse.json(
        { error: "At least one field (name, number) is required" },
        { status: 400 }
      );
    }

    // Connect to DB
    await connectToDb();

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user data if provided
    if (name) user.name = name;
    if (number) user.number = number;
    if (balance) user.balance = balance;
    if (dailyLimit) user.dailyLimit = dailyLimit;

    // Save the updated user data
    await user.save();

    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}