"use client"
import { motion } from "motion/react"

function AnimatedHr() {
  return (
    <motion.hr
        className = "w-full rounded-2xl  mx-auto bg-border  h-1 origin-center"
        transition={{
            type: "spring",
            duration: 3
        }}
        initial = {{
            scaleY: 1,
            scaleX: 0
        }}

        animate = {{
            
            scaleY: .5,
            scaleX: 1
        }}
    />
  )
}

export default AnimatedHr