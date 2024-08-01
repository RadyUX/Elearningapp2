
import Link from "next/link" 


const NavbarLanding = () =>{
    return(
        <div className="p-4 border-b h-[80px]  flex items-center bg-[#13131B] shadow-sm">
          <div className="p-6">
          logo
        </div>
         <div className="flex gap-x-2 ">   
            <Link href="#aboutme">Qui SUIJE </Link>
            <Link href="#about">A PROPOS </Link>
        </div>
        </div>
    )
}

export default NavbarLanding