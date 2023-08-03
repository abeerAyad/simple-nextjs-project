import Post from "@/models/postModel"
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const posts = await Post.find().populate({
            path: 'userId',
            select: '-password'
        })
        return NextResponse.json({msg:'get posts successfully',posts}, {status:200})

    } catch (error) {
        return NextResponse.json({ error:error.message }, { status: 500 })
    }
}


