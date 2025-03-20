import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import Ads from "@/models/Ads";
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
        });
      }
  
      await connectToDb();
  
      // ✅ Fetch the user
      const user = await User.findById(session.user.id);
      if (!user) {
        return new NextResponse(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      }
  
      // ✅ Check if user has an active plan
      if (!user.ads) {
        return new NextResponse(
          JSON.stringify({ error: "Upgrade to view ads!" }),
          { status: 403 }
        );
      }
  
      // ✅ Check daily ad limit
      if (user.adsWatchedToday >= user.dailyLimit) {
        return new NextResponse(
          JSON.stringify({
            error: "You've reached your daily ad limit! Come back tomorrow!",
          }),
          { status: 403 }
        );
      }
  
      // ✅ Get the ad by ID
      const { id } = params;
      const ad = await Ads.findById(id);
  
      if (!ad) {
        return new NextResponse(JSON.stringify({ error: "Ad not found" }), {
          status: 404,
        });
      }
  
      // ✅ Increment user's ad watched count
      user.adsWatchedToday += 1;
      await user.save();
  
      return new NextResponse(JSON.stringify({ ad, message: "Ad viewed successfully!" }), { status: 200 });
    } catch (error) {
      console.error("Error fetching ad:", error);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong" }),
        { status: 500 }
      );
    }
  };