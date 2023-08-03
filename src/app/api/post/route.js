import dbConnection from "@/db/dbConnection";
import { getUserData } from "@/helpers/route";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";


dbConnection()

export async function POST(req)  {
    const user = await getUserData(req);
        const userData = await User.findOne({_id: user._id}).select('_id')

    try {
        const {title, content} = await req.json()
        const post = await Post.create({
            title, content, userId:userData._id
        })
        return NextResponse.json({msg:'post created successfully', post}, {status:201})

    } catch (error) {
        return NextResponse.json({ error:error.message }, { status: 500 })
    }
}