
import Link from "next/link" 


const NavbarLanding = () =>{
    return(
        <div className="p-4 border-b h-[80px]  flex items-center bg-[#13131B] shadow-sm fixed w-full z-40">
          <div className="p-6 md:mr-12 md:ml-12">
          logo
        </div>
         <div className="flex md:gap-x-9 gap-5 ">   
            <Link href="#aboutme">Qui Suis Je</Link>
            <Link href="#about">A Propos </Link>
        </div>
        </div>
    )
}

export default NavbarLanding