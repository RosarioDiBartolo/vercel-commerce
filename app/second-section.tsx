import { InfiniteSlider } from "@/components/ui/slider"
import Image from "next/image"
function SecondSection() {
  return (
   <section id = "products-slider" className="p-10 space-y-6 w-full">
            <h4 className="text-2xl font-semibold font-aclonica">Introducing StyleLoom Essentials</h4>
            <p className="font-abeezee text-muted-foreground">
              Crafted for barbers, loved by all. Our exclusive product line is designed to keep your hair healthy, strong, and stylish. Stay fresh — every day.
            </p>

            {/* Placeholder: Featured Products */}
            <InfiniteSlider className=" relative w-full ">
              
              
              <div className=" w-32 h-32  relative">
                <Image 
                className=" rounded-xl aspect-contain"
                layout="fill"
                src="/Cream.jpg" alt={"cream"}                />
              </div><div className=" w-32 h-32  relative">
                <Image 
                className=" rounded-xl aspect-cover"
                layout="fill"
                src="/spray.jpg" alt={"cream"}                />
              </div>
            </InfiniteSlider>
           
          </section>
  )
}

export default SecondSection