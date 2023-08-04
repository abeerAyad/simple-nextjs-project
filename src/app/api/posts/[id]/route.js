import dbConnection from "@/db/dbConnection"
import Post from "@/models/postModel"
import { NextResponse } from "next/server"

dbConnection()

export async function DELETE(req, {params:{id}}) {
    try {
       
        const deletedPost = await Post.deleteOne({_id: id})
        return NextResponse.json({msg:'Post Deleted Successfully', deletedPost, status:200})
    } catch (error) {
        return NextResponse.json({ error:error.message }, { status: 500 })
        
    }
}


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



export async function PUT(req, {params:{id}}) {
    try {
        const {title, content} = await req.json()

        const updatedPost = await Post.findByIdAndUpdate(id, {title, content})
        return NextResponse.json({msg:'Update Post Successfully', updatedPost})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}