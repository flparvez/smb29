import { authOptions } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import Deposit, { IDeposit } from "@/models/Deposit";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            NextResponse.json(
                {error : "Unauthorized"}, {status: 401}
            )
        }
        await connectToDb();
        const body:IDeposit = await req.json();
 
        if (
            !body.method ||
            !body.amount ||
            !body.trx
        ) {
            return NextResponse.json(
                {error : "All fields are required"}, {status: 400}
            )
        }


        const depositData ={
            ...body,
            user: session?.user.id
        }

        const deposit = await Deposit.create(depositData);
        return new NextResponse(
            JSON.stringify(deposit),
            { status: 201 }
          );
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({ error: 'Category Creation Errors: ' + error }),
            { status: 400 }
          );
    }
}


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