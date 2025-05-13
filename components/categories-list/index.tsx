"use server"
import { buttonVariants } from "@/components/ui/button";
import { getCategories } from "lib/medusa";
import Link from "next/link";

async function CategoriesList() {
  const categories = await getCategories();

    return (
    <ul className=" flex gap-2">
        {categories.map(
            c=> (
              
               <li key={c.id}  >
                <Link
              
              href={c.path}
                    className={
                      buttonVariants({
                        variant:"outline",
                        className: " font-lobster tracking-tighter  rounded-2xl border border-dashed p-3    "})
                    }
                  >
                   
                {c.title}
                </Link>
                </li>
             
            )
        )}
  </ul>
  )
}

export default CategoriesList