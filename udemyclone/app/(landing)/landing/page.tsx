"use client"

import { Button } from "@/components/ui/button";
import particle from "@/lib/particle"
import Link  from "next/link";
import Image from "next/image";
import Particles from "react-tsparticles";
import { ArrowBigDown } from "lucide-react";

export default function Landing() {

return (

        <div className=" h-screen w-screen">
         <Particles options={particle}></Particles>
        <div className="gap-y-8 flex items-center justify-center flex-col">
        <h2 className="md:text-xl">DUMMY TEXT</h2>
        <h1 className="md:text-3xl">MEGA DUMMY TEXT</h1>
        <h2 className="text-center md:text-xl">very long dummy text to introduce my beautiful app</h2>
        <Button className="p-6 bg-[#5DC8E6]"><Link href="/sign-in">SIGN IN</Link></Button>
        
        
        <div>
        <Image src="/screen.jpg" width={800}
      height={800}
      className="rounded-md" alt="Picture of the author" />
   
        </div>
        <ArrowBigDown size={48}  />
        <div className="grid" id="about">

        </div>

        <div className="flex" id="aboutme">

        </div>

        </div>
       
      </div>
      
    )
  }
  