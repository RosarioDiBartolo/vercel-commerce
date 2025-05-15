"use server";

import { AnimatedTabs, Tab } from "@/components/ui/animated-tabs"; // adjust path if needed
import { getCategories } from "lib/medusa";
import CategoryPreview from "./category-preview";

async function CategoriesList() {
  const categories = await getCategories();
  const Tabs: Tab[] = categories.map(
    c=> ({
      id: c.id, 
      label: c.title,
      content: <CategoryPreview {...c}  />
    })
  )
  if (categories.length === 0) return null;

  return (
    <AnimatedTabs
      tabs={Tabs}
      defaultTab={categories[0].id}
      className="rounded-lg bg-zinc-100 p-1"
       
    />
  );
}

export default CategoriesList;
