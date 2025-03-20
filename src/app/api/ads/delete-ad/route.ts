import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import Ads from "@/models/Ads";

// ✅ DELETE Route: Delete Ad
export const DELETE = async (req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        await connectToDb();        
     
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const user = await User.findById(session?.user.id);
        if (!user) {
            return new NextResponse(JSON.stringify({ error: "User not found" }), {
                status: 404,
            });
        }
        const ads = await Ads.findByIdAndDelete(id);
        if (!ads) {
            return new NextResponse(JSON.stringify({ error: "Ad not found" }), {
                status: 404,
            });
        }
        return new NextResponse(JSON.stringify({ message: "Ad deleted successfully" }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Ad deletion failed: " + error }), { status: 400 });
    }
};

//  get all ads

export const GET = async () => {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //     return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
    //         status: 401,
    //     });
    // }

    try {
        await connectToDb();
        // const user = await User.findById(session?.user.id);
        // if (!user) {
        //     return new NextResponse(JSON.stringify({ error: "User not found" }), {
        //         status: 404,
        //     });
        // }
        
        const ads = await Ads.find({}).sort({ createdAt: -1 }).lean();
        return new NextResponse(JSON.stringify(ads), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to fetch ads: " + error }), { status: 400 });
    }
};