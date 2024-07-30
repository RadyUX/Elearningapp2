import { Logo } from "./Logo"
import { SidebarRoutes } from "./sidebar-routes"
export const Sidebar = ()=>{
    return(
        <div className="h-full  flex flex-col overflow-y-auto
      bg-[#13131B] shadow-sm">
        <div className="p-6">
            <Logo />
        </div>
        <div className="flex flex-col w-full">
            <SidebarRoutes />
        </div>
       </div>
    )
}