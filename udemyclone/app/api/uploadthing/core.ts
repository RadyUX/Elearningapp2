import { isAdmin } from "@/lib/admin";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = ()=>{
    const {userId} = auth()
    const isAuthorized= isAdmin(userId)
    
    if(!userId || !isAuthorized){
       throw new Error ("unauthorized")
    }
    return {userId}
}
 

export const ourFileRouter = {
 courseImage: f({image:  {maxFileSize: "4MB", maxFileCount: 1}})
 .middleware(()=>handleAuth())
 .onUploadComplete(()=>{}),

 courseAttachment: f(["text", "image", "video", "audio", "pdf"])
 .middleware(()=>handleAuth())
 .onUploadComplete(()=>{}),

 chapterContent: f({blob: {maxFileSize: "1GB", maxFileCount: 1}})
 .middleware(()=>handleAuth())
 .onUploadComplete(()=>{}),
 
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;