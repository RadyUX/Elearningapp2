"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, Pencil, PlusCircle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Course } from "@prisma/client"
import Image from "next/image"
import { FileUpload } from "@/components/file-upload"


const formShema = z.object({
    imageUrl: z.string().min(1, {
        message: "image is required"
    })
})

interface ImageFormPorps {
    initialData: Course
    courseId: string
    
}
export const ImageForm = ({    initialData, courseId}: ImageFormPorps)=>{
    const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
    const toggleEdit = () => setIsEditing((current) => !current)
    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || ""
        }
        
        
    })

    const {isSubmitting, isValid} = form.formState

    const onSubmit = async(values: z.infer<typeof formShema>) =>{
      try{
        await axios.patch(`/api/courses/${courseId}`, values)
        toast.success('course updated')
        toggleEdit()
        router.refresh()
      }catch{
        toast.error("something went wrong")
      }
    }
    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course image
                <Button  onClick={toggleEdit} variant='ghost'>
                    {isEditing && (<>Cancel</>)}

                     {!isEditing && !initialData.imageUrl &&(
                    <>
                       <PlusCircle className="h-4 w-4 mr-2"/>
                            add an image
                    </>
                    )}

{!isEditing && initialData.imageUrl &&(
                    <>
                       <PlusCircle className="h-4 w-4 mr-2"/>
                            edit image
                    </>
                    )}
                     
                </Button>

            </div>

            {!isEditing && (
               !initialData.imageUrl ? (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                    <ImageIcon className="h-4 w-4 mr-2"/>
                </div>
               ) : (
                <div className="relative aspect-video mt-2">
                   <Image alt="upload" fill className="object-cover rounded-md" src={initialData.imageUrl}/>
                </div>
               )
            )}
            {isEditing && (
                <div>
                    <FileUpload endpoint="courseImage" onChange={(url)=>{if(url){onSubmit({imageUrl: url})}}} />
                        <div className="text-sd text-muted-foureground mt-4">

                        </div>
                </div>
            )}
        </div>
    )
}