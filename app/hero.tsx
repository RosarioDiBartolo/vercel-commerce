"use client"
import { Button } from "@/components/ui/button"
import { MoveDown } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import AppearContainer from "./appear-container"
import Socials from "./socials"


 
 
function Hero() {
  return ( 
    <section className="relative h-[90svh] mb-10 mx-auto max-w-[1600px]  text-start    p-10 "> 
      <AppearContainer
      className=" h-full flex-col items-end md:flex-row flex flex-wrap gap-5  w-full       "        >
       
        <motion.div className=" h-full   flex flex-col justify-between   relative    "  > 
          <div className=" h-fit"> 
          <h3 className="  font-aclonica text-secondary-foreground text-2xl ">
            Dallo Stile alla Formula
          </h3>
          <h2 className=" text-6xl font-aclonica">
             Il Tuo Look <div className="   text-7xl underline  "> <span className=" text-fuchsia-600">  Inizia </span> Qui </div>
          </h2>

            <h3 className=" mt-6 rounded-2xl p-0 hover:p-5 shadow-xl shadow-transparent transition-all
             hover:shadow-black/20 text-2xl border border-r-2 border-accent  text-muted-foreground ">
              Scopri la nuova linea di prodotti professionali per capelli, creata da chi vive ogni giorno il mondo della barberia. Qualità artigianale, performance da salone.
            </h3>
          </div>
                <Socials />

         </motion.div> 
       < motion.div
       
      className="relative h-full  flex-1  "> 
      
        <Image 
        layout= "fill"
        className=" rounded-b-2xl object-cover rounded-t-2xl" 
        src="/mattia consoli.jpeg" alt={""}  />
                    
        </motion.div> 
           
       </ AppearContainer> 
       <AppearContainer className="rounded-3xl absolute bottom-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-background p-3 z-10">
             <Button 
             onClick={()=>{
              document.querySelector('#products-overview')?.scrollIntoView ({ behavior: 'smooth' })
             }}
             className="cursor-pointer flex gap-2 p-5 !px-6 group items-center border border-muted-foreground border-dashed rounded-xl">
            
              Dai una occhiata
              <MoveDown  className="transition-all group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
           </AppearContainer>
          </section>
  )
}

export default Hero