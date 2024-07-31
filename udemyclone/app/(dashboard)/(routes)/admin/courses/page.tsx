import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DataTable } from "./_components/DataTables"
import { auth } from "@clerk/nextjs/server";
import { columns } from "./_components/columns";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CoursePage = async () => {
    const { userId } = auth();
  
    if (!userId) {
      return redirect("/");
    }
    
  
    const courses = await db.course.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return ( 
      <div className="p-6">
        <DataTable columns={columns} data={courses} />
      </div>
     );
  }
export default CoursePage