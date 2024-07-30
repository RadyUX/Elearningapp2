"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"


const formShema = z.object({
    title: z.string().min(1, {
        message: "title is required"
    })
})

interface TitleFormPorps {
    initialData: {
        title: string,
    }
    courseId: string
    
}
export const TitleForm = ({    initialData, courseId}: TitleFormPorps)=>{
    const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
    const toggleEdit = () => setIsEditing((current) => !current)
    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: initialData,
        
        
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
        <div className="mt-6 border bg-[#13131B] rounded-md p-4">
            <div className="font-medium flex items-center justify-between ">
                Course title 
                <Button  onClick={toggleEdit} variant='ghost'>
                    {isEditing && (<>Cancel</>)}
                     {!isEditing && (<>
                        <Pencil className="h-4 w-4 mr-2"/>
                        edit title
                     </>)}
                     
                </Button>

            </div>
            {!isEditing && (
                <p className="text-sm mt-2">{initialData.title}</p>
            )}
            {isEditing && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <FormField
                    control={form.control}
                    name="title"  
                    render={({field}) => ( 
                        <FormItem>
                        
                           <FormControl>
                               <Input disabled={isSubmitting} {...field}/>
                           </FormControl>
                           <FormMessage/>
                        </FormItem>
                       
                       )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Button disabled={!isValid || isSubmitting} type="submit">Save</Button>
                    </div>
                </form>
                </Form>
            )}
        </div>
    )
}