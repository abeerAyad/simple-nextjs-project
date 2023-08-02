import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const response = NextResponse.json({msg:'Logout Successfully'})
        response.cookies.set('token', '')
        return response
    } catch (error) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}
