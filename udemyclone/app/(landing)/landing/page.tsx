"use client"

import { Button } from "@/components/ui/button";

import Link  from "next/link";
import Image from "next/image";
import Particles from "react-tsparticles";
import { ArrowBigDown } from "lucide-react";
import Banner from "./_components/BannerMarquee";

export default function Landing() {

return (

    <div className="h-full w-screen relative mt-10">
  
    <div className="relative z-10 flex flex-col items-center justify-center gap-y-8 min-h-screen">
      <h1 className="text-3xl text-[#5DC8E6]  font-bold">ELearningApp</h1>
      <h2 className="text-xl text-center text-gray-500">découvrir les secrets des techno en une app</h2>
      <button className="px-6 py-2 bg-[#5DC8E6] text-white rounded-md">
        <Link href="/sign-in">SIGN IN</Link>
      </button>

   

      <ArrowBigDown size={48} className="text-[#5DC8E6] " />
      <div className="w-full pt-10 pb-10"><Banner /></div>

      <h1 className="text-3xl text-[#5DC8E6] font-bold mt-10 mb-12 text-center">Une multitude de sujets pour les nouveaux passionés du web</h1>
      <div className="h-full w-screen gap-y-28 px-4 md:px-56 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#07070F] rounded-lg" id="about">
      {/* Personalized Learning */}
      <div className="p-4 space-y-2">
        <h2 className="text-[#5DC8E6] font-semibold">Apprentissage personnalisé</h2>
        <p className="text-gray-200 w-2/3">
          Vous guide à travers un parcours d'apprentissage sur mesure selon votre niveau et vos intérêts à travers une interface intuitive et agréable. Suivez votre progression et accédez facilement à vos chapitres en cours.
        </p>
      </div>
      <div>
        <Image src="/screen2.jpg" width={700} height={800} className="rounded-md border" alt="Example image" />
      </div>

      {/* Forum */}
      <div className="p-4 space-y-2">
        <h2 className="text-[#5DC8E6] font-semibold">Interface Intuitive</h2>
        <p className="w-2/3 text-gray-200">
        Progresser a votre rythme
        </p>
      </div>
      <div>
        <Image src="/screen4.jpg" width={700} height={800} className="rounded-md border" alt="Example image" />
      </div>

      {/* Free Signup */}
      <div className="p-4 space-y-2">
        <h2 className="text-[#5DC8E6] font-semibold">Inscription Gratuite</h2>
        <p className="w-2/3 text-gray-200">
          L'accès à l'essentiel de notre contenu est entièrement gratuit, vous offrant la liberté d'explorer et d'apprendre sans barrière. Pour ceux qui souhaitent aller plus loin, nos chapitres avancés, payants et facultatifs vous attendent, prêts à débloquer de nouveaux horizons de connaissances.
        </p>
      </div>
      <div>
        <Image src="/screen3.jpg" width={700} height={800} className="rounded-md border" alt="Example image" />
      </div>
    </div>
      
      <div className=" items-start md:pr-56 md:pl-56 mt-12 justify-around flex flex-col  h-full w-screen gap-y-5 bg-[#13131B] p-6 pt-20 pb-20 ">
            <p className="md:w-2/4">ElearningApp est plus qu'une plateforme d'e-learning classique, 
             couvrant à la fois les essentiels et les aspects moins connus du développement web dans les cours en ligne francophones. 
             Que vous soyez débutant ou déjà sur votre chemin d'apprentissage, je m'engage à vous équiper et a vous faire découvrir les outils et le secret du web pour stimuler votre curiosité.
           </p>
           <div className="flex gap-3">
            <Button className="bg-[#5DC8E6] hover:bg-white hover:text-black "><Link href="/sign-in">se connecter</Link></Button>
            <Button className="bg-white text-black hover:bg-[#5DC8E6] hover:text-white"><Link href="/sign-up">s'inscrire</Link></Button>
           </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center w-screen h-full bg-[#07070F] p-4 md:p-24" id="aboutme">

      <div className="flex justify-center mb-8 md:mb-0 md:flex-none w-full md:w-1/4">
        <div className="relative w-40 h-40 md:w-64 md:h-64">
          <Image 
            src="/photo1.jpg" 
            layout="fill" 
            className="rounded-full object-cover" 
            alt="Picture of the founder"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center items-center md:items-start w-full md:w-3/4">
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center md:text-left">Rafaele Sinaguglia</h1>
        <h2 className="text-white text-xl md:text-2xl text-center md:text-left">Fondateur</h2>
        <p className="text-white mt-4 w-full md:w-2/3 text-center md:text-left">
          Je suis un jeune développeur passionné par le web, extrêmement curieux. Mon parcours autodidacte m'a fait découvrir de nombreux sujets intéressants souvent négligés par d'autres plateformes d'e-learning. Avec [Nom de l'App], j'ai voulu créer un espace où les débutants et moi pouvons approfondir notre compréhension dans ce domaine. Rejoignez-moi pour explorer ensemble les aspects du web.
        </p>
      </div>
    </div>
    </div>

 
    <footer className="bg-[#13131B] p-8 md:p-28 text-white">
  <div className="flex flex-col md:flex-row gap-5 md:gap-10 justify-center items-center">
    <p>rafaele.sinaguglia@gmail.com</p>
    <p>Politique de confidentialité</p>
    <p>Mention Légal</p>
  </div>
  <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12">
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
  