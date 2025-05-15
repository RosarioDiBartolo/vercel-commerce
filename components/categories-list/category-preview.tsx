import { getProducts } from "@/lib/medusa"
import { ProductCollection } from "@/lib/medusa/types"
import Grid from "../grid"
import ProductGridItems from "../layout/product-grid-items"

async function CategoryPreview(category: ProductCollection) {

  const products  = await getProducts({
    categoryId: category.id
  })
  return (
  
  <Grid className="   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
   
         <ProductGridItems products={products} />
         </Grid>
  )
}

export default CategoryPreview