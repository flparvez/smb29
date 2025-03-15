import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next"
import { connectToDb } from "@/lib/db";
import Deposit, { IDeposit } from "@/models/Deposit";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
    try {
        // Retrieve the session from NextAuth
        const session = await getServerSession( authOptions)
console.log(session)
        // If no session, return Unauthorized response
        if (!session) {
            return new NextResponse(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401 }
            );
        }

        // Connect to the database
        await connectToDb();

        // Parse the request body
        const body: IDeposit = await req.json();

        // Validate required fields
        if (!body.method || !body.amount || !body.trx) {
            return new NextResponse(
                JSON.stringify({ error: "All fields are required" }),
                { status: 400 }
            );
        }

        // Add user ID to the deposit data
        const depositData = {
            ...body,
            user: session.user.id,
        };

        // Create a new deposit record
        const deposit = await Deposit.create(depositData);

        // Return success response with created deposit
        return new NextResponse(
            JSON.stringify(deposit),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating deposit:", error);
        return new NextResponse(
            JSON.stringify({ error: `Deposit Creation Errors: ${error}` }),
            { status: 500 }
        );
    }
};


export async function DELETE(request: NextRequest) {

    try {
         const { searchParams } = new URL(request.url);

        const id = searchParams.get('id');
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid or missing  ID" }, { status: 400 });
        }
        
// find deposit by id and delete
 await Deposit.findByIdAndDelete(id);
 return NextResponse.json({ message: "Deposit deleted successfully" });

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'Category Creation Errors: ' + error }),
            { status: 400 }
          );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);  
        const id = searchParams.get('id');
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid or missing  ID" }, { status: 400 });
        }
        const body:IDeposit = await request.json();
        if (
            !body.method ||
            !body.amount ||
            !body.trx ||
            !body.approved
        ) {
            return NextResponse.json(
                {error : "All fields are required"}, {status: 400}
            )
        }
        await connectToDb();
        const deposit = await Deposit
        .findById
        (id);
        if (!deposit) {
            return NextResponse.json({ error: "Deposit not found" }, { status: 404 });
        }
        deposit.amount = body.amount;
        deposit.method = body.method;
        deposit.approved = body.approved;
        await deposit.save();
        return NextResponse.json(deposit);
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'Category Creation Errors: ' + error }),
            { status: 400 }
          );
    }
}


export async function GET(){
    try {
        await connectToDb();
        const deposits =await Deposit.find({}).sort({createdAt: -1}).lean().populate("user");
        return new NextResponse(
            JSON.stringify(deposits),
            { status: 200 }
          );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'Category Creation Errors: ' + error }),
            { status: 400 }
          );
        
    }
}