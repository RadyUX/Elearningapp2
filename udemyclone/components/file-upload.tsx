"use client"

import { UploadDropzone } from "@/lib/uploathing"
import { ourFileRouter } from "@/app/api/uploadthing/core"

import toast from "react-hot-toast";

interface fileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({
    onChange, endpoint
}: fileUploadProps) =>{
return(
    <UploadDropzone endpoint={endpoint} onClientUploadComplete={(res)=>{onChange(res?.[0].url)}} onUploadError={(errpr: Error) => {toast.error("something went wro,g")}} />
)
}