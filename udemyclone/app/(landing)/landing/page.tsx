"use client"

import { Button } from "@/components/ui/button";
import particle from "@/lib/particle"
import Link  from "next/link";
import Image from "next/image";
import Particles from "react-tsparticles";
import { ArrowBigDown } from "lucide-react";
import Banner from "./_components/BannerMarquee";
export default function Landing() {

return (

    <div className="h-screen w-screen relative">
    <Particles className="absolute inset-0" options={particle} />
    <div className="relative z-10 flex flex-col items-center justify-center gap-y-8 min-h-screen">
      <h1 className="text-3xl text-[#5DC8E6]  font-bold">MEGA DUMMY TEXT</h1>
      <h2 className="text-xl text-center text-gray-700">very long dummy text to introduce my beautiful app</h2>
      <button className="px-6 py-2 bg-[#5DC8E6] text-white rounded-md">
        <Link href="/sign-in">SIGN IN</Link>
      </button>

      <Image src="/screen.jpg" width={800} height={800} className="rounded-md" alt="Picture of the author" />

      <ArrowBigDown size={48} className="text-[#5DC8E6] " />
      <div className="pt-10 pb-10"><Banner /></div>

      <h1 className="text-3xl text-[#5DC8E6] font-bold mt-10">Une multitude de sujets pour les nouveaux passionés du web</h1>

      <div className=" h-screen w-screen pr-56 pl-56 grid grid-cols-2 gap-4 p-4 bg-[#07070F] rounded-lg ">
        <div className=" p-4">
          <h2 className="font-semibold">Apprentissage personnalisé</h2>
          <p>Vous guide à travers un parcours d'apprentissage sur mesure selon votre niveau et vos intérêt a travers une interface intuitive et agréable, Suivez votre progression et accéder facilement à vos chapitre  en cours.</p>
        </div>

        <div className=""><Image src="/screen.jpg" width={800} height={800} className="rounded-md" alt="Picture of the author" /></div>

        <div className=" p-4">
          <h2 className="font-semibold">Forum</h2>
          <Image src="/screen.jpg" width={800} height={800} className="rounded-md" alt="Picture of the author" />
        </div>

        <p>domkfdslkjfcildsjfkildjfildsjfildsqjkf</p>
        <div className=" p-4">
        <h2 className="font-semibold">Apprentissage personnalisé</h2>
          <p>Vous guide à travers un parcours d'apprentissage sur mesure selon votre niveau et vos intérêt a travers une interface intuitive et agréable, Suivez votre progression et accéder facilement à vos chapitre  en cours.</p>
        </div>

        <div className=""><Image src="/screen.jpg" width={800} height={800} className="rounded-md" alt="Picture of the author" /></div>

      </div>
    </div>

    <div className="flex bg-[#07070F]" id="aboutme">
        <div>dsopkfkdo^pfkeldopfkdsopfikoepsk</div>
    </div>
  </div>

      
    )
  }
  