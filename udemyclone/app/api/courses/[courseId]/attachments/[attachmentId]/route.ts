import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function DELETE(req: Request,{params}: {params: {courseId: string, attachmentId: string}}) {
    try{
        const {userId} = auth()
        
        if (!userId) {
            return new NextResponse("unauthorized", { status: 401 })
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
        

        
        const attachment = await db.attachment.delete({
            where:{
                courseId: params.courseId,
                id: params.attachmentId,
            }
        })

        console.log("Attachment deleted", attachment)

        return NextResponse.json(attachment)
    }catch(error){
        console.error("Error:", error)
        return new NextResponse("internal error", { status: 500 })
    }
}