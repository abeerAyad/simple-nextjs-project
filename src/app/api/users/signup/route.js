import User from "@/models/userModel";
import { NextResponse } from "next/server"
import { hash } from 'bcryptjs'
import dbConnection from "@/db/dbConnection";

dbConnection()

export async function POST(req)  {
    try {
        const {username, email, password} = await req.json();

        const userIsExisted = await User.findOne({ email });

        if(userIsExisted) {
        return NextResponse.json({msg: 'user already exist'}, {status:400})
        }

        const hashPassword = await hash(password, 10)

        await User.create({
            username,
            email,
            password:hashPassword
        })
        return NextResponse.json({msg:'user created successfully!', status:201})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status:500})
}
}
