import { NextResponse as res } from "next/server"
const SEVEN_DAY = (7 * 24 * 60 * 60)

export const config = {
    matcher: '/admin/:path*',
}

export const middleware = async (request)=>{
    const cookies = request.cookies.get("accessToken")
    
    if(!cookies)
        return res.redirect(new URL('/login', request.url))

    const api = await fetch(`${process.env.SERVER}/api/session`, {
        method: 'post',
        body: JSON.stringify({token: cookies.value}),
        headers: {
            'Content-Type': 'application/json'
        },
    })

   if(!api.ok)
    return res.redirect(new URL('/login', request.url))

   const body = await api.json()
   const result = res.next()
   result.cookies.set("session", JSON.stringify(body), {maxAge: SEVEN_DAY})
   return result
}