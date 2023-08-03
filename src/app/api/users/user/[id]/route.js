import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req,{params:{id}}) {
    try {
        const user = await User.findOne({_id:id}).select('-password')
        return NextResponse.json({msg:'get user', user})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}