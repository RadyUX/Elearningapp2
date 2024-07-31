"use client"
import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { SearchInput } from "./SearchInput"
export const NavbarRoutes = () => {
    const pathname = usePathname();
    const router = useRouter();

    const isAdminPage = pathname?.startsWith("/admin");
    const isPlayerPage = pathname?.includes("/chapter");
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


            ) : (
                <Link href="/admin/courses">
                    <Button size='sm' variant="ghost">
                        Admin Mode
                    </Button>
                </Link>
            )}
            <UserButton />
        </div>

        </div>

        </>
    );
};