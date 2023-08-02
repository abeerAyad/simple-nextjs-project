import User from "@/models/userModel";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {email, password} = await req.json();
        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({msg:'must signup', status:400})
        }

        const validUser = await compare(password, user.password);
        if(!validUser) {
            return NextResponse.json({msg:'InValid  User', status:400})
        }

        const token = await sign({
            _id:user.id,
            username:user.username,
            email:user.email
        }, process.env.TOKEN_SECRET)

        const response = NextResponse.json({msg:'login successfully', status:201})
        response.cookies.set('token', token)
        return response

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status:500})
    }
}
