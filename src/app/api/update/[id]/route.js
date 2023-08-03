import dbConnection from "@/db/dbConnection"
import Post from "@/models/postModel"
import { NextResponse } from "next/server";

dbConnection();
export async function PUT(req, {params:{id}}) {
    try {
        const {title, content} = await req.json()

        const updatedPost = await Post.findByIdAndUpdate(id, {title, content})
        return NextResponse.json({msg:'Update Post Successfully', updatedPost})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}