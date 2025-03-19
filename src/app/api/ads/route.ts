import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import Ads, { IAds } from "@/models/Ads";

// ✅ POST Route: Create New Ad
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDb();
    const body: IAds = await req.json();

    if (!body.name || !body.ads_link) {
      return new NextResponse(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

  

    const adsData = {
      ...body,
      user: session.user.id,
    };
    const ad = await Ads.create(adsData);

    return new NextResponse(
      JSON.stringify({ message: "Ad successfully Created", ad }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding ad to user:", error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
};

// ✅ GET Route: Fetch Ads for Plan Users Only
export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDb();

    const user = await User.findById(session?.user.id);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // ✅ Only Plan Users can access ads
    if (!user.ads) {
      return new NextResponse(
        JSON.stringify({ error: "Upgrade to view ads!" }),
        { status: 403 }
      );
    }

    // ✅ Limit user to view ads per day
    if (user.adsWatchedToday >= user.dailyLimit) {
      return new NextResponse(
        JSON.stringify({
          error: "You've reached your daily ad limit! Come back tomorrow!",
        }),
        { status: 403 }
      );
    }

    // ✅ Fetch ads (Randomized for variation)
    const ads = await Ads.aggregate([{ $sample: { size: user.dailyLimit } }]);

    // ✅ Increment ads watched count
    user.adsWatchedToday += 1;
    await user.save();

    return new NextResponse(JSON.stringify({ ads }), { status: 200 });
  } catch (error) {
    console.error("Error fetching ads:", error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
};
