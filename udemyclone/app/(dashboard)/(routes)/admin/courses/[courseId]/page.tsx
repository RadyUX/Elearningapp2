import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { TitleForm } from "./_components/TitleForm"
import { DescriptionForm } from "./_components/DescriptionForm"
import{ ImageForm} from "./_components/ImageForm"
import { CategoryForm } from "./_components/DescriptionForm copy"
import { PriceForm } from "./_components/PriceForm"
import { File } from "lucide-react"
import { AttachmentForm } from "./_components/AttachmentForm"
import { ChapterForm } from "./_components/ChapterForm"
import { Banner } from "@/components/banner"
import { Actions } from "./_components/Actions"

const CourseIdPage = async ({params}: {params: {courseId: string}}) =>{

    const {userId} = auth()

    if(!userId){
        return redirect("/sign-in")
    }
    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                }
            },
            attachments: { 
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })
    

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    

    if(!course){
        return redirect("/")
    }
   
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ]


    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    

    const completionText = `${completedFields} / ${totalFields}`

    const isComplete = requiredFields.every(Boolean)
    return (
        <>
        {!course.isPublished && <Banner label="Module non publié"/>}
        <div className="p-6">
         <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium text-[#5DC8E6]">
                    Course setup
                </h1>
                <span className="text-sm text-white">complete all fields {completionText}</span>
                <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
                <div className="flex items-center gap-x-2">
                    <h2 className="text-xl text-[#5DC8E6] ">Course customisation</h2>
                </div>
                <TitleForm initialData={course} courseId={course.id} />

                <DescriptionForm initialData={course} courseId={course.id} />
                <ImageForm initialData={course} courseId={course.id} />

                <CategoryForm initialData={course} courseId={course.id} options={categories.map((category)=>({
                    label: category.name,
                    value: category.id
                }))} />

<PriceForm initialData={course} courseId={course.id} />

            </div>
            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-xl text-[#5DC8E6] ">Course chapter</h2>
                    </div>
                </div>
                <ChapterForm initialData={course} courseId={course.id} />

                <div className="flex items-center gap-x-2">
                    <File />
                <h2>Resource and attachment</h2>
             </div>
             <AttachmentForm initialData={course} courseId={course.id} />
            </div>
            
             
         </div>
        </div>
        </>
    )
}
export default CourseIdPage