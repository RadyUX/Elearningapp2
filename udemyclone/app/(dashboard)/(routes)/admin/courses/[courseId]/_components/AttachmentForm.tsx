"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Attachment, Course } from "@prisma/client"
import Image from "next/image"
import { FileUpload } from "@/components/file-upload"


const formShema = z.object({
    url: z.string().min(1)
})

interface AttachmentFormPorps {
    initialData: Course & {attachments: Attachment[]}
    courseId: string
    
}
export const AttachmentForm = ({   initialData, courseId}: AttachmentFormPorps)=>{
    const [isEditing, setIsEditing] = useState(false)
    const [deletindId, setDeletingId] = useState<string | null>(null)

  const router = useRouter()
    const toggleEdit = () => setIsEditing((current) => !current)



    const onSubmit = async(values: z.infer<typeof formShema>) =>{
      try{
        await axios.post(`/api/courses/${courseId}/attachments`, values)
        toast.success('course updated')
        toggleEdit()
        router.refresh()
      }catch{
        toast.error("something went wrong")
      }
    }


    const onDelete = async (id: string) =>{
        try{
            axios.delete(`/api/courses/${courseId}/attachments/${id}`)
        }catch{
            toast.error("something went wrong")
        }finally{
            setDeletingId(null)
        }
    }


    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course attachment
                <Button  onClick={toggleEdit} variant='ghost'>
                    {isEditing && (<>Cancel</>)}

                     {!isEditing && (
                    <>
                       <PlusCircle className="h-4 w-4 mr-2"/>
                           add file
                    </>
                    )}

                     
                </Button>

            </div>

            {!isEditing && (
                <>
                {initialData.attachments.length === 0 && (<p>no attachment yet</p>)}
                {initialData.attachments.length > 0 && (<div>{initialData.attachments.map((attachment) =>(<div key={attachment.id} className="flex items-center p-3 w-full "><File /><p>{attachment.name}</p>
                {deletindId === attachment.id && (<div><Loader2/></div>)}
                {deletindId !== attachment.id && (<button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75"><X /></button>)}
                </div>))}</div>)}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload endpoint="courseAttachment" onChange={(url)=>{if(url){onSubmit({url: url})}}} />
                        <div className="text-sd text-muted-foureground mt-4">
                            add attachment to complete the course
                        </div>
                </div>
            )}
        </div>
    )
}