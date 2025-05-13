import Image from "next/image"
function Hero() {
  return (
     <div className=" relative flex gap-5  w-full p-5  h-[50svh] flex-1    ">
       <div className="relative  flex-2 h-full"> 
        <Image 
        layout= "fill"
        className=" rounded-b-2xl object-cover rounded-t-2xl" 
        src="/mattia consoli.jpeg" alt={""}  />
        </div>
        <div className="relative flex-1    h-full"> 

          <Image 
          layout= "fill"
          className=" rounded-b-2xl object-cover rounded-t-2xl" 
          src="/salah-regouane-MRCdF3qUbp0-unsplash.jpg" alt={""}  />
        </div>
        
    </div>
     
  )
}

export default Hero