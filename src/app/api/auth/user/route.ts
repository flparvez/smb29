

// get user data by id 

import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ error: "Invalid user ID" }), { status: 403 });
    }
    await connectToDb();
    const user = await User.findById(id);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse(JSON.stringify({ error: `Failed to fetch user: ${error}` }), { status: 500 });
  }
}