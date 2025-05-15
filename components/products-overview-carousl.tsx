"use client";
import AppearContainer from "@/app/appear-container";
import { ThreeDPhotoCarousel } from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "./ui/button";

// Card data
const cards = [
  { img: "/Cream.jpg" },
  { img: "/rasoi neri.webp" },
  { img: "/rasoi bianchi.webp" },
  { img: "/Cream.jpg" },
  { img: "/Cream.jpg" },
];

function ProductOverviewCarousel() {
    return(
       <section
      id = "products-overview"
      className=" bg-background/10 w-full rounded-2xl backdrop-blur-sm    relative  min-h-[90svh]  text-center  p-10 ">
 
                  <h2 className=" text-3xl font-aclonica ">
                      Esplora la Nostra Linea di Prodotti
                  </h2>
          <AppearContainer className={""}> 

                  <h3 className="     text-xl text-secondary-foreground">
                    Scopri la gamma completa di prodotti professionali creati in barberia e perfezionati per l’uso quotidiano.
                  Performance, carattere e qualità — tutto in un solo brand.
                  </h3>
                                     </AppearContainer>
              <AppearContainer className={" my-10"}> 
              <ThreeDPhotoCarousel  className=""/> 
              
               </AppearContainer>
                <AppearContainer className="rounded-3xl shadow shadow-secondary absolute bottom-60 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-background p-3 z-10">
              <Link href={"/search"}> 
             <Button 
            
             className=" bg-gradient-to-bl from-primary   to-primary/80 cursor-pointer flex gap-2 p-5 !px-6 group items-center border border-muted-foreground border-dashed rounded-xl">
            
              Esplorali  <span className=" text-fuchsia-500"> tutti </span>
             </Button>
             </Link>
           </AppearContainer>
                 

       </section>
       )}

export default ProductOverviewCarousel;
