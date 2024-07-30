"use client"

import { cn } from "@/lib/utils"
import { Icon, LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"



interface SidebarItemProps {
    icon: LucideIcon,
    label: string,
    href: string,
}
export const SidebarItem = ({icon: Icon,label,href}: SidebarItemProps)=>{
   
   const pathname = usePathname()
   const router = useRouter()

   // Détermine si la route actuelle est active en vérifiant si pathname est la racine, égale à href, ou une sous-route de href.
   const isActive = (pathname === "/" && href === '/' ) ||
   pathname === href ||
   pathname?.startsWith(`${href}/`)
   

   const onClick = ()=>{
    router.push(href)
   }
   
    return(
       <button onClick={onClick} 
       type="button" 
       className={cn("flex items-center gap-x-2 text-sm font-[500] pl-6 text-white transition-all hover:bg-slate-300/20",
        isActive && "text-[#5DC8E6] bg-sky-200/20 hover:bg-sky-200/20"
       )}>
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn("text-white", isActive && "text-[#5DC8E6]")} />
            </div>

            {label}

       </button>
    )
}