import dbConnection from "@/db/dbConnection";
import { getUserData } from "@/helpers/route";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const user = await getUserData(req);
        const userIsLogged = await User.findOne({_id: user._id}).select('-password')  
        return NextResponse.json({msg: 'user found ', data : userIsLogged})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}