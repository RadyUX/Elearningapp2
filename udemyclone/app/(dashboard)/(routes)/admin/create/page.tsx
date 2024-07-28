"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import toast from "react-hot-toast"


const formShema = z.object({
    title: z.string().min(1, {
        message: "title is required"
    })
})
const CreatePage = () =>{
const router = useRouter()
    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: {
            title: ""
        }
    })

    const {isSubmitting, isValid} = form.formState

    const onSubmit = async(values: z.infer<typeof formShema>) =>{
       try{
       const response = await axios.post("/api/courses", values)
       router.push(`/admin/courses/${response.data.id}`)
       toast.success('course created')

       }catch{
        toast.error("something went wrong") 
       }
    }
    return(
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
                <div>
                    <h1 className="text-2xl">
                        Course name
                    </h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                             <FormField control={form.control} name="title" 
                             render={({field}) => ( 
                             <FormItem>
                                <FormLabel>
                                    Course title
                                </FormLabel>
                                <FormControl>
                                    <Input disabled={isSubmitting} {...field}/>
                                </FormControl>
                                
                             </FormItem>
                            
                            )}/>
                            <div className="flex items-center gap-x-3">
                                <Link href="/">
                                  <Button type="button" variant="ghost">Cancel</Button>
                                </Link>
                                
                                  <Button type="submit" disabled={!isValid || isSubmitting}>Continue</Button>
                                
                            </div>
                        </form>
                    </Form>
                </div>
        </div>
        
    )
}

export default CreatePage