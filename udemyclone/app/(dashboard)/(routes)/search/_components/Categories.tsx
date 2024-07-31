"use client";

import { Category } from "@prisma/client";
import { BiLogoTypescript, BiLogoJavascript,BiLogoHtml5 , BiLogoReact, BiLogoDevTo  } from "react-icons/bi";
import { IconType } from "react-icons";
import { SiMysql } from "react-icons/si";
import { CategoryItem }  from "./CategoriesItem"

interface CategoriesProps {
  items: Category[];
}

           
const iconMap: Record<Category["name"], IconType> = {
  "Javascript": BiLogoJavascript,
  "HTML & CSS": BiLogoHtml5 ,
  "React JS": BiLogoReact,
  "Typescript":  BiLogoTypescript,
   "mySQL":  SiMysql,
"Algorithme & Datastructure": BiLogoDevTo ,
  
};
 
export const Categories = ({
  items,
}: CategoriesProps) => {

    
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem 
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}