import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){

    try {
         const {name,number, password,refer} = await request.json();
         if (!number || !password ) {
            return NextResponse.json(
                {error : " Number and Password is required"}, {status: 400}
            )
         }

         await connectToDb();

          const existingUser =  await User.findOne({number})

          if (existingUser) {
            return NextResponse.json(
                {error : "User already exists"}, {status: 400}
            )
         }

          await User.create({
            name,
            number,
             password,
             refer
        })

         return NextResponse.json(
            {message : "User Registered Succesfully"},
            { status: 201}
         );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
          
            {error : "Failed to register user"+error}, {status: 500}
        )
    }
}

export async function GET(){
    connectToDb()

    const user = await User.find();
    return NextResponse.json({user})
}