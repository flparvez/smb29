// src/app/api/ads/route.ts
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import Ads from "@/models/Ads";
import {  NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDb();

    // Fetch the user
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has an active ad plan
    if (!user.ads) {
      return NextResponse.json(
        { error: "❌ Upgrade to view ads!" },
        { status: 403 }
      );
    }

    // Check daily ad limit
    if (user.adsWatchedToday >= user.dailyLimit) {
      return NextResponse.json(
        { error: "🔴 You've reached your daily ad limit! Come back tomorrow!" },
        { status: 403 }
      );
    }

    // Fetch ads (randomized)
    const ads = await Ads.aggregate([{ $sample: { size: user.dailyLimit } }]);

    // Increment ads watched count
    user.adsWatchedToday += 1;
    await user.save();

    return NextResponse.json({ ads }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json(
      { error: "⚠️ Something went wrong. Please try again!" },
      { status: 500 }
    );
  }
};
