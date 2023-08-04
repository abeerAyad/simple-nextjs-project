import { getUserData } from "@/helpers/route";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const {_id} = await getUserData(req);
        const userData = await User.findOne({_id: _id}).select('-password')  
        return NextResponse.json({msg: 'user found ',  userData})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}