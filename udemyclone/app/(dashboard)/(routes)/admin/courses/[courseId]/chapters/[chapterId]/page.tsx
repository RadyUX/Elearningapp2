import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react"; // Removed unused imports
import { db } from "@/lib/db";
import { ChapterTitleForm } from "./_components/ChapterTitleForm";
import { ChapterDescriptionForm } from "./_components/ChapterDescriptionForm";
import { ChapterAccessForm } from "./_components/ChapterAccessForm";
import { ChapterContentForm } from "./_components/ChapterContentForm";
import { Banner } from "@/components/banner";
const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.content];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean)

  return (

    <>
    {!chapter.isPublished && (
        <Banner variant="warning" label="this chapter is not published"/>
    )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/admin/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl text-[#5DC8E6] font-medium">Chapter Creation</h1>
                <span className="text-sm  text-white">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterAction disabled={!isComplete} courseId={params.courseId} chapterId={params.chapterId} isPublished={chapter.isPublished}/>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"></div>
        <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
              <LayoutDashboard />
              <h2>customize chapter</h2>
           </div>
           <ChapterTitleForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />

           <ChapterDescriptionForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
           
          </div>
          <div className="flex items-center gap-x-2">
            <Eye />
            <h2 className="text-xl">access setting</h2>
          </div>
          <ChapterAccessForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />

          <div className="flex items-center gap-x-2">
              <Video />
              <h2 className="text-xl">
                Add Course content
              </h2>
            </div>
            <ChapterContentForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>
        </div>
        
     

    </>
  );
};

export default ChapterIdPage;
