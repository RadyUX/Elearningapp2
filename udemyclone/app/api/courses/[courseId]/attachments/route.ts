import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request, {params}: {params: {courseId: string}}){
    try{
        const { userId } = auth()
        const { url } = await req.json()

        console.log("Received URL:", url)

        if (!userId) {
            return new NextResponse("unauthorized", { status: 401 })
        }

        const isCourseAdmin = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })

        console.log("isCourseAdmin:", isCourseAdmin)

        if (!isCourseAdmin) {
            return new NextResponse("unauthorized", { status: 401 })
        }

        const attachment = await db.attachment.create({
            data: {
                url,
                name: url.split("/").pop(),
                courseId: params.courseId
            }
        })

        console.log("Attachment created:", attachment)

        return NextResponse.json(attachment)
    } catch (error) {
        console.error("Error:", error)
        return new NextResponse("internal error", { status: 500 })
    }
}
