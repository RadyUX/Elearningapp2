import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
  children?: ReactNode;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  children,
  label,
}: InfoCardProps) => {
  return (
    <div className=" rounded-md flex flex-col justify-center items-center gap-2 p-3 mt-12">
      <Icon className="text-lg" />
      <div>
        <p className="font-medium text-[18px] text-center">
          {label}
        </p>
        {children} 
        <p className="text-[#5DC8E6] text-[16px] text-sm text-center">
          {numberOfItems} Cours 
        </p>
       
      </div>
     
    </div>
  )
}