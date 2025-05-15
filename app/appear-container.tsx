"use client"
import { motion, Variants } from "motion/react";
import React, { PropsWithChildren } from "react";

const containerVariants: Variants = {
  visible:{
    transition: {
      staggerChildren: 0.5
    }
  }
}

const transitionVariants = {
      hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            flex: "2",
            height: "100%",
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
     
}
function AppearContainer({children, className}: PropsWithChildren<{className: string}>) {
  return (
      <motion.div
      viewport={{
        once: true
      }}
      variants = {containerVariants}
      initial = "hidden"
      whileInView={"visible"}
      className={className}    >
        {React.Children.map(children, (c, k)=>(
              < motion.div
                key = {k}
                  variants={transitionVariants}
               >
                {c}
                </motion.div>
        ) )}
      </motion.div>
   
  )
}

export default AppearContainer