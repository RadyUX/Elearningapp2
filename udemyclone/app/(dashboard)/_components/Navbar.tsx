import {MobileSidebar} from "./MobileSidebar"
import { NavbarRoutes } from "@/components/navbar-routes"
const Navbar = () =>{
    return(
        <div className="p-4 border-b border-[#5DC8E6] h-full  flex items-center bg-[#13131B] shadow-sm">
           <MobileSidebar />
           <NavbarRoutes />
        </div>
    )
}

export default Navbar 