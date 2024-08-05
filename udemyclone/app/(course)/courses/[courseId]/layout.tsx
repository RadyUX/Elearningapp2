import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/getProgress";
import { CourseSidebar } from "./_components/CourseSidebar";
import { CourseNavbar } from "./_components/CourseNavbar";
const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar  course={course}
          progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
      <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>

      <footer className="bg-[#13131B] p-8 md:p-28 text-white">
    <div className=" flex flex-col md:flex-row gap-5 md:gap-10 justify-center items-center">
        <p>rafaele.sinaguglia@gmail.com</p>
        <p>Politique de confidentialité</p>
        <p>Mention Légal</p>
    </div>
    <div className=" md:ml-[95px] flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12">
        <p>© 2024 [app name], All rights reserved.</p>
        <div className="flex gap-4">
        <p>icon 1</p>
        <p>icon 2</p>
        </div>
    </div>
</footer>
    </div>
  )
}

export default CourseLayout