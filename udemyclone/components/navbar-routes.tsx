"use client"
import { useAuth, UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { SearchInput } from "./SearchInput"
import { isAdmin } from "@/lib/admin"
export const NavbarRoutes = () => {

    const {userId} = useAuth()
    const pathname = usePathname();
    const router = useRouter();

    const isAdminPage = pathname?.startsWith("/admin");
    const isLandingPage = pathname?.startsWith("/landing");
    const isPlayerPage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search"

    return (
        <>
        {isSearchPage && (
            <div className="hidden md:block">
              <SearchInput />
            </div>
          )}
        <div>
         
        <div className="flex gap-x-2 ml-auto">
            {isAdminPage || isPlayerPage ? (
                   <Link href="/">
                        <Button  size='sm' variant="ghost">
                            <LogOut className="h-4 w-4 mr-2"/>
                            EXIT
                        </Button> 
                    </Link>


            ) : isAdmin(userId) ? (
                <Link href="/admin/courses">
                    <Button size='sm' variant="ghost">
                        Admin Mode
                    </Button>
                </Link>
            ) : null}
            <UserButton />
        </div>

        </div>

        </>
    );
};