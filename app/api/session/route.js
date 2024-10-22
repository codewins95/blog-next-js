import { NextResponse as res } from "next/server"
import jwt from 'jsonwebtoken'

export const POST = async (request)=>{
    try {
        const {token} = await request.json()
        const session = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        return res.json(session)
    }
    catch(err)
    {
        return res.json(
            {success: false},
            {status: 401}
        )
    }
}