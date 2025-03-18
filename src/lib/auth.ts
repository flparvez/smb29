//  NextAuthOption

import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDb } from "./db";
import User from "@/models/User";
import bcrypt from 'bcryptjs'


export const authOptions:NextAuthOptions = {
    providers : [
        // GoogleProvider({
        //     clientId : process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret : process.env.GOOGLE_CLIENT_SECRET!
        // }),
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                name : {
                    label : "Name",
                    type : "text",
                    placeholder : "Name"
                },
                number : {
                    label : "Number",
                    type : "number",
                    placeholder : "Number"
                },
                 balance : {
                    label : "Balance",
                    type : "number",
                    placeholder : "Balance"
                },
            
                password : {
                    label : "Password",
                    type : "password",
                    placeholder : "Password"
                },
                role: {
                    label: "Role",
                    type: "text",
                    placeholder: "Role"
                }
            },
             async authorize(credentials) {
                if (!credentials?.number || !credentials?.password) {
                    throw new Error("Number and Password is required");
                }

             try {
                await    connectToDb();
                const user = await User.findOne({number : credentials.number});
                if (!user) {
                    throw new Error("User Not Found");
                }
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isValid) {
                        throw new Error("Wrong Password");
                    }
           
                return {
                    id: user._id.toString(),
                    number : user.number,
                    balance : user.balance,
                  
                    name : user.name,
                    role : user.role,
                }
             } catch (error) {
                throw new Error("Database Error"+error);
             }



             }

        })
    ],

    //  callbacks

    callbacks : {
  
        async jwt({token, user}){
            if (user) {
                token.id = user.id
                token.name = user.name
       
                token.role = user.role
                
            }

            return token
        },

        //  session
        async session({session, token}) {
            if(session.user){
                session.user.id = token.id as string
                session.user.name = token.name as string
                session.user.number = token.number as number
                session.user.balance = token.balance as number
                session.user.role = token.role as string
            }

            return session
        }
    },
    
    pages : {
      signIn: "/login",  
      error : "/auth/login"
    },
    session : {
        strategy : "jwt",
        maxAge : 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
}

