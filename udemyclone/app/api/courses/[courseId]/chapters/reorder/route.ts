import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req:Request,{params}: {params: {courseId: string;} }) {
    try{
        const {userId} = auth()
        const { list } = await req.json()
       


        if(!userId){
            return new NextResponse("unauthorized", {status: 401})
        }

        const isCourseAdmin = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })

        if (!isCourseAdmin) {
            return new NextResponse("unauthorized", { status: 401 })
        }
    
        for(let item of list){
            await db.chapter.update({
                where: {id: item.id},
                data: {position: item.position}
            })
        }
      
    return NextResponse.json("success", {status: 200})

    }catch(error){
        console.log('[REORDER]', error)
        return new NextResponse("internal error", {status: 500})
    }
}