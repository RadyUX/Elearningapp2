import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { CheckCircle, Clock, Badge } from "lucide-react";

import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/InfoCard";
import { getDashboardCourses } from "@/actions/getDashboardCourses";

export default async function Dashboard() {

  const getBadge = (completedCount: number) => {
    if (completedCount > 10) {
      return <p>Expert</p>;
    } else if (completedCount > 5) {
      return <p>Intermédiaire</p>;
    } else if (completedCount > 3) {
      return <p>Débutant Avancé</p>;
    } else {
      return <p>Débutant</p>;
    }
  }

  
  const { userId } = auth();

  if (!userId) {
    return redirect("/landing");
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);


  return (
    <>
     <div className="h-2/6 bg-[url('/apprentissage.jpg')] bg-cover  flex flex-col justify-center items-center">
          <h1 className="text-3xl font-medium">Mon Apprentissage</h1>
          <h2 className="font-bold text-[12px] text-center md:text-xl">Reprenez Vos Modules En Cours</h2>
        </div>
    <div className="p-6 space-y-4 min-h-full bg-[#07070F] ">
       <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
       <InfoCard
          icon={Clock}
          label="En Progression"
          numberOfItems={coursesInProgress.length}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completé"
          numberOfItems={completedCourses.length}
          variant="success"
       />
         <InfoCard
          icon={Badge}
          label="Badge"
          variant="success"
          numberOfItems={completedCourses.length}
       >{getBadge(completedCourses.length)}</InfoCard>
      </div>
      

  
    </div>
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
</>
  )
}
