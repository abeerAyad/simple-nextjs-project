import dbConnection from "@/db/dbConnection"
import Post from "@/models/postModel"
import { NextResponse } from "next/server"

dbConnection()

export async function DELETE(req, {params}) {
    try {
       
        const deletedPost = await Post.deleteOne({_id:params.id})
        return NextResponse.json({msg:'Post Deleted Successfully', deletedPost, status:200})
    } catch (error) {
        return NextResponse.json({ error:error.message }, { status: 500 })
        
    }
}