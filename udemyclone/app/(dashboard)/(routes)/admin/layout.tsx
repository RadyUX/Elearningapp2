import { isAdmin } from "@/lib/admin";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const AdminLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { userId } = auth();

  if (!isAdmin(userId)) {
    console.log("non authorisé")
    return redirect("/");
    

  }

  

  return <>{children}</>
}
 
export default AdminLayout;