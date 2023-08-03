import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function GET(req,{params:{id}}) {
    try {
        const post = await Post.findOne({_id:id}).populate({
            path:'userId',
            select:'-password'
        })
        return NextResponse.json({msg:'Get Single Post', post})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}