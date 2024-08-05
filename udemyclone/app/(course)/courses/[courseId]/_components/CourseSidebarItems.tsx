"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
};

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-white text-sm font-[500] pl-6 transition-all hover:text-[#5DC8E6] ",
        isActive && " bg-slate-200/20 hover:bg-slate-200/20 hover:[#5DC8E6]",
        isCompleted && "[#5DC8E6] ",
        
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-[#5DC8E6]",
            isActive && "text-[#5DC8E6]",
            isCompleted && "text-[#5DC8E6]"
          )}
        />
        {label}
      </div>
      <div className={cn(
        "ml-auto opacity-0 border-2 text-white h-full transition-all",
        isActive && "opacity-100",
        isCompleted && "border-[#5DC8E6]"
      )} />
    </button>
  )
}