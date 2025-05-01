// lib/medusaClient.ts
 
export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_API || "http://localhost:9000",
  publishableKey: process.env.MEDUSA_API_KEY,
  auth: { type: "session" },
  debug: process.env.NODE_ENV === "development",
})

import Medusa from "@medusajs/js-sdk"
import {
  StoreCart,
  StoreCartLineItem,
  StoreProduct,
  StoreProductImage,
  StoreProductOption,
  StoreProductVariant
} from "@medusajs/types"
import { TAGS } from "lib/constants"
import { mapOptionIds } from "lib/utils"
import { revalidateTag } from "next/cache"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { calculateVariantAmount, convertToDecimal } from "./helpers"
import { Cart, CartItem, Image, Product, ProductCollection, ProductOption, ProductVariant, SelectedOption } from "./types"

 

export async function getCategoryProducts(
  handle: string,
  reverse?: boolean,
  sortKey?: string
): Promise<Product[]> {
  const { product_categories } = await sdk.store.category.list( {handle})
   if (!product_categories?.length) {
    return []
  }

  const category = product_categories[0]
  try{
  const { products } = await sdk.store.product.list({
    category_id: category?.id,
    fields:  "*variants.calculated_price",  
    region_id:(await sdk.store.region.list()).regions[0]?.id,
    
   })

 
  const reshaped =   products.map(reshapeProduct)
  if (sortKey === "PRICE") reshaped.sort((a, b) => +a.priceRange.maxVariantPrice.amount - +b.priceRange.maxVariantPrice.amount)
  if ( reverse) reshaped.reverse()
    
    return reshaped
  }
  catch (error) {
    console.error("Error fetching products for category:", error)
    return []
  }

}

 const reshapeCart = (cart: StoreCart)  : Cart=> {
   const lines = cart?.items?.map((item) => reshapeLineItem(item)) || [];
   const totalQuantity = lines.reduce((a, b) => a + b.quantity, 0);
   const checkoutUrl = '/checkout'; // todo: implement medusa checkout flow
   const currencyCode = cart.region?.currency_code.toUpperCase() || 'USD';
    let subtotalAmount = '0';
   if (cart.subtotal && cart.region) {
     subtotalAmount = convertToDecimal( cart.subtotal, cart.currency_code ).toString();
   }
 
   let totalAmount = 'Default Amount';
   if (cart.total && cart.region) {
     totalAmount = convertToDecimal( cart.subtotal, cart.currency_code ).toString();
   }
 
   let totalTaxAmount = '0';
   if (cart.tax_total && cart.region) {
     totalTaxAmount = convertToDecimal( cart.subtotal, cart.currency_code ).toString();
   }
 
   const cost = {
     subtotalAmount: {
       amount: subtotalAmount,
       currencyCode: currencyCode
     },
     totalAmount: {
       amount: totalAmount,
       currencyCode: currencyCode
     },
     totalTaxAmount: {
       amount: totalTaxAmount,
       currencyCode: currencyCode
     }
   };
 
   return {
     ...cart,
      totalQuantity,
     checkoutUrl,
     lines,
     cost
   };
 };
 
 const reshapeLineItem = (lineItem:StoreCartLineItem): CartItem  => {
   const product: Product = {
     title: lineItem.title,
     priceRange: {
       maxVariantPrice : calculateVariantAmount(lineItem.variant!  ),
     },
     updatedAt: lineItem.updated_at as Date ,
     createdAt: lineItem.created_at as Date,
     tags: [],
     descriptionHtml: lineItem.product_description ?? '',
     featuredImage: {
       url: lineItem.thumbnail ?? '',
       altText: lineItem.title ?? ''
     },
     availableForSale: true,
     variants: lineItem.variant?  [ reshapeProductVariant(lineItem.variant)]: [ ],
     handle: lineItem.variant?.product?.handle ?? '',
     options: [] as ProductOption[]
   };
 
   const selectedOptions =
     lineItem.variant?.options?.map((option) => ({
       name: option.option?.title ?? '',
       value: option.value
     })) || [];
 
   const merchandise = {
     id: lineItem.variant_id || lineItem.id,
     selectedOptions,
     product,
     title: lineItem.product_description ?? ''
   };

   console.log("  lineItem.variant?.calculated_price?.calculated_amount", lineItem.variant?.calculated_price  )
 
   const cost = {
     totalAmount: {
       amount: convertToDecimal(
         lineItem.unit_price || 0,
         lineItem.variant?.calculated_price?.currency_code || 'EUR'
       ).toString(),
       currencyCode: lineItem.variant?.calculated_price?.currency_code?.toUpperCase() || 'EUR'
     }
   };
   const quantity = lineItem.quantity;
 
   return {
     ...lineItem,
     merchandise,
     cost,
     quantity
   } as unknown  as CartItem;
 };
// Helper to reshape product images
const reshapeProductImageDTOs = (ProductImageDTOs?:StoreProductImage[], title?: string)  : Image[]=> {
  return (
    ProductImageDTOs?.map(img => {
      const filename = img.url.split('/').pop()?.split('.')[0] || title || ''
      return { ...img,  altText: `${title} - ${filename}` }  
    }) ?? []
  ) as Image[]
}

// Helper to reshape product options
const reshapeProductOption = (option: StoreProductOption, product: StoreProduct): ProductOption => ({
  ...option,
  deleted_at: option.deleted_at as string,
  updated_at: option.updated_at as string,
  created_at: option.created_at as string,
  product_id: product.id as string,
  availableForSale: true,
  product: undefined,
   name: option.title,
   values: [...new Set(option.values?.map((v: any) => v.value) ?? [])],
})
 

const reshapeProductVariant = (
  productVariant: StoreProductVariant  ,
  productOptions?: StoreProductOption[]
): ProductVariant  =>  {
  let selectedOptions: SelectedOption[] = [];
  if (productOptions && productVariant.options) {
    const optionIdMap = mapOptionIds(productOptions );
     selectedOptions = productVariant.options.map((option) => ({
      name: optionIdMap[option.option_id as string] ?? '',
      value: option.value
    }));
 
  }
  const availableForSale =  true;
  const price = calculateVariantAmount(productVariant);

  return {
    ...productVariant,  
    product_id: productVariant.product_id as string,
    id: productVariant.id as string,
    product: undefined,
    availableForSale,
    selectedOptions,
    price
  }  as ProductVariant
};
// Helper to reshape a product
const reshapeProduct = (product: StoreProduct): Product  => {
  const variants = product.variants
  const firstVariant = variants?.[0]
   const reshapeOption  = (o: StoreProductOption) =>reshapeProductOption(o, product )
   const p  = {
    ...product,
    priceRange:   { maxVariantPrice: { amount: convertToDecimal(firstVariant?.calculated_price?.calculated_amount || 0, firstVariant?.calculated_price?.currency_code || "usd").toString(), currencyCode: firstVariant?.calculated_price?.currency_code?.toUpperCase() || "USD" } },
    createdAt: new Date(product.created_at as string),
    updatedAt: new Date(product.updated_at  as string),
    tags: product.tags?.map((t: any) => t.value) || [],
    descriptionHtml: product.description || "",
    featuredImage: { url: product.thumbnail || "", altText: `${product.title}` },
    availableForSale:   true,
    images: reshapeProductImageDTOs(product.images || [], product.title),
    variants: variants?.map((v: StoreProductVariant) => reshapeProductVariant (v, product.options || [])) || [],

    options: product.options?.map( reshapeOption ) || [],
  }
   return( p as unknown as Product)
}
// Helper to reshape a category
const reshapeCategory = (cat: any): ProductCollection => ({
  ...cat,
  title: cat.name,
  description: cat.description || cat.metadata?.description || "",
  seo: {
    title: cat.metadata?.seo_title || cat.name,
    description: cat.metadata?.seo_description || cat.description,
  },
  path: `/search/${cat.handle}`,
  updatedAt: cat.updated_at,
})

// Storefront actions
export async function createCart()  {
  const region = (await ( sdk.store.region.list())).regions[0]
  const { cart } = await sdk.store.cart.create({
    region_id: region?.id,
  })
  return reshapeCart(cart)
}

export async function addToCart(cartId: string, item: { variantId: string; quantity: number })  {
   await sdk.store.cart.createLineItem (cartId, 
    { variant_id: item.variantId, quantity: item.quantity ,},
    {
      fields: "items.variant"
    }
   
  )

  }

export async function removeFromCart(cartId: string, lineItemId: string)  {
   return await sdk.store.cart.deleteLineItem(cartId, lineItemId)
 }

export async function updateCart(cartId: string, { lineItemId, quantity }: { lineItemId: string; quantity: number }) {
   await sdk.store.cart.updateLineItem(cartId, lineItemId, { quantity })
 
}

export async function getCart(cartId: string): Promise<Cart | null> {
 
  try {
    const { cart } = await sdk.store.cart.retrieve(cartId, {
      

      fields: "*items.variant.*"
    },
    
  )
    return reshapeCart( cart)
  } catch (error) {
    console.error("Failed to retrieve cart:", error)
    return null
  }
}

export async function getCategories(): Promise<ProductCollection[]> {
  const { product_categories } = await sdk.store.category.list()
  return product_categories.filter(c => !c.handle.startsWith("hidden")).map(reshapeCategory)
}

export async function getCategory(handle: string): Promise<ProductCollection | undefined> {
  const { product_categories } = await sdk.store.category.list({ handle })
  return product_categories.length ? reshapeCategory(product_categories[0]) : undefined
}

export async function getProducts(options: { query?: string; reverse?: boolean; sortKey?: string; categoryId?: string }) {
  const params: any = { limit: 100 }
  if (options.query) params.q = options.query
  if (options.categoryId) params.category_id = [options.categoryId]
  const { products } =   await sdk.store.product.list({    
    fields:  "*variants.calculated_price",  
    q: options.query,
    region_id:(await sdk.store.region.list()).regions[0]?.id, 
     })
  const result = products.map(reshapeProduct)
  if (options.sortKey === "PRICE") result.sort((a, b) => +a.priceRange.maxVariantPrice.amount - +b.priceRange.maxVariantPrice.amount)
  if (options.sortKey === "CREATED_AT") result.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
  if (options.reverse) result.reverse()
  return result
}

export async function getProduct(handle: string): Promise<ReturnType<typeof reshapeProduct > | undefined> {
  const { products } = await sdk.store.product.list({ handle, limit: 1,
    fields:  "*variants.calculated_price",  
    region_id:(await sdk.store.region.list()).regions[0]?.id, 
     })

  return products[0]  &&  reshapeProduct(products[0])  
}

export async function getMenu(menu: string): Promise<any[]> {
  if (menu === "next-js-frontend-header-menu") {
    return (await getCategories()).map(c => ({ title: c.title, path:   `/search/${ c.handle }` }))
  }
  if (menu === "next-js-frontend-footer-menu") {
    return [
      { title: "About Medusa", path: "https://medusajs.com/" },
      { title: "Medusa Docs", path: "https://docs.medusajs.com/" },
      { title: "Medusa Blog", path: "https://medusajs.com/blog" },
    ]
  }
  return []
}

// ISR revalidation handler
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  const topic = (await headers()).get("x-medusa-topic") || ""
  const secret = req.nextUrl.searchParams.get("secret")
  if (secret !== process.env.MEDUSA_REVALIDATION_SECRET) {
    return NextResponse.json({ status: 401, message: "Invalid secret" })
  }
  const tags = []
  if (topic.startsWith("categories/")) tags.push(TAGS.categories)
  if (topic.startsWith("products/")) tags.push(TAGS.products)
  tags.forEach(t => revalidateTag(t))
  return NextResponse.json({ status: 200, revalidated: true })
}