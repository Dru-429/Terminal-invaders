"use client"

import { Navbar } from "@/components/hero/Navbar";
import { motion } from "framer-motion";

export default function player(){
  return (
    <div>
      <Navbar /> 
      <section className='px-6 py-10 border border-border '>
        {/* {children} */}
        <div className='mt-8 flex-1 flex flex-col items-center justify-center min-h-65 relative z-10'>
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className='flex flex-col items-center gap-2'
          >
            <span className='font-mono text-base tracking-[0.4em] text-foreground font-semibold'>
              REALISING SOON
            </span>
            <span className='font-mono text-[9px] md:text-xs tracking-[0.2em] text-secondary uppercase'>
              Prepared to be amazed (￣__,￣)
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  )
}