import { db } from "@/lib/db"
import { Categories } from "./_components/Categories"
import { SearchInput } from "@/components/SearchInput"
import { getCourses } from "@/actions/GetCourses"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { CoursesList } from "@/components/courses-list"

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};


const SearchPage =  async ({
  searchParams
}: SearchPageProps)=>{
   const {userId} = auth()

   if(!userId){
    return redirect("/")
   }
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

  
    const courses = await getCourses({
      userId,
      ...searchParams,
    });
    return(
        <>
        <div className="h-2/6 bg-[url('/module.jpg')] bg-cover flex flex-col justify-center items-center">
      <h1 className="text-3xl font-medium">Tout les modules</h1>
      <h2 className="font-bold text-[12px] text-center md:text-xl">
        découvrez de nouvelles technologies, leurs histoire et comment s'en servir à travers des série de cours
      </h2>
    </div>
    <div className="flex flex-col min-h-screen">
      
  <div className="flex-grow">
    
    <div className="px-6 pt-6 md:hidden md:mb-0 block">
      <SearchInput />
    </div>
    <div className="p-6 space-y-4">
      <Categories items={categories} />
    </div>
    <div className="overflow-auto m-4 bg-[#07070F]">
      <CoursesList items={courses} />
    </div>
  </div>
  <footer className="bg-[#13131B] p-8 md:p-28 text-white">
    <div className="flex flex-col md:flex-row gap-5 md:gap-10 justify-center items-center">
      <p>rafaele.sinaguglia@gmail.com</p>
      <p>Politique de confidentialité</p>
      <p>Mention Légal</p>
    </div>
    <div className="md:ml-[95px] flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12">
      <p>© 2024 [app name], All rights reserved.</p>
      <div className="flex gap-4">
        <p>icon 1</p>
        <p>icon 2</p>
      </div>
    </div>
  </footer>
</div>
      </>
    )
}

export default SearchPage