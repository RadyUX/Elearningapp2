import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
export async function POST(
    req: Request
){
    try{
        const { userId } = auth()
        const { title } = await req.json()
         
        if(!userId || !isAdmin(userId)){
            console.log(userId)
            return new NextResponse("unauthorized", {status: 401})
            
        }
        const course = await db.course.create({
            data:{
                userId,
                title
            }
        })

        return NextResponse.json(course)
    }catch(error){
        console.log("[COURSE]", error)
        return new NextResponse("internal error ", {status: 500})
    }
}