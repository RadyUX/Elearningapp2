import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/getChapters";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { CourseProgressButton } from "./_component/CourseProgressButton";
import { CourseEnrollButton } from "./_component/CourseEnrollButton";
import Image from "next/image";

const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth();
  
  if (!userId) {
    console.log("user not found")
    return redirect("/");
  } 

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    console.log("couse not found")
    return redirect("/")
  
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return ( 
    <div className="flex flex-col min-h-screen">
        <div className="flex-grow">  
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="You already completed this chapter."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20" >
        <div className="p-4">
         
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            <Image src={course.imageUrl  ?? ''} alt="lol" width={100} height={100} />
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <>
             
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
              </>
            )}
            </div>
            <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a 
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border-[#5DC8E6] text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
            </div>
            {!isLocked ? (
                  <div className=" flex justify-center ">
                  <Preview value={chapter.content  ?? ''} />
                  </div>
            ): <div><h1 className="text-3xl text-center">content locked</h1></div>}
          </div>
          
      <footer className="bg-[#13131B] p-8 md:p-28 text-white">
    <div className=" flex flex-col md:flex-row gap-5 md:gap-10 justify-center items-center">
        <p>rafaele.sinaguglia@gmail.com</p>
        <p>Politique de confidentialité</p>
        <p>Mention Légal</p>
    </div>
    <div className=" md:ml-[215px] flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12">
        <p>© 2024 [app name], All rights reserved.</p>
        <div className="flex gap-4">
        <p>icon 1</p>
        <p>icon 2</p>
        </div>
    </div>
</footer>
            
            </div>
            

   );
}
 
export default ChapterIdPage;