"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, PlusCircle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Chapter, Course } from "@prisma/client"


const formShema = z.object({
    title: z.string().min(1) 
})

interface ChapterFormPorps {
    initialData: Course & {chapters: Chapter[]}
    courseId: string
    
}
export const ChapterForm = ({    initialData, courseId}: ChapterFormPorps)=>{
    const [isCreating, setIsCreating] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
    const toggleCreating = () => setIsCreating((current) => !current)

    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: {
          title: "",
        }
        
        
    })

    const {isSubmitting, isValid} = form.formState

    const onSubmit = async(values: z.infer<typeof formShema>) =>{
      try{
        await axios.post(`/api/courses/${courseId}/chapters`, values)
        toast.success('chapter updated')
        toggleCreating()
        router.refresh()
      }catch{
        toast.error("something went wrong")
      }
    }
    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course chapters
                <Button  onClick={toggleCreating} variant='ghost'>
                    {isCreating && (<>Cancel</>)}
                     {!isCreating && (<>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                       add chapter
                     </>)}
                     
                </Button>

            </div>
          
            {isCreating  && (
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
                    
                    <Button disabled={!isValid || isSubmitting} type="submit">Create</Button>
                    
                </form>
                </Form>
            )}

            {!isCreating && (
               <div className={cn("text-sm mt-2",!initialData.chapters.length && "text-slate-500 italic")}>
                {!initialData.chapters.length && "no chapter"}
               </div>
               //todo
            )}
            
        </div>
    )
}