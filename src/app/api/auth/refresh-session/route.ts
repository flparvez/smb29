// /app/api/auth/refresh-session/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDb();
    const user = await User.findById(session.user.id);

    if (user) {
        session.user.balance = user.balance;
    }

    return NextResponse.json(session);
};
