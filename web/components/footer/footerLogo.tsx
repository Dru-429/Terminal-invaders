"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function FooterLogo() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const x = useSpring(mouseX, {
    stiffness: 180,
    damping: 20,
  });

  const y = useSpring(mouseY, {
    stiffness: 180,
    damping: 20,
  });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const move = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();

      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const leave = () => {
      mouseX.set(-500);
      mouseY.set(-500);
    };

    wrapper.addEventListener("mousemove", move);
    wrapper.addEventListener("mouseleave", leave);

    return () => {
      wrapper.removeEventListener("mousemove", move);
      wrapper.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mt-28 overflow-hidden select-none py-10"
    >
      {/* Background glow */}
      <motion.div
  className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
  animate={{
    backgroundPosition: [
      "0px 0px",
      "20px 15px",
      "0px 0px",
    ],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  }}
  style={{
    backgroundImage: `
      repeating-radial-gradient(
        circle at 0 0,
        rgba(255,255,255,.08) 0px,
        rgba(255,255,255,.08) .8px,
        transparent 1.8px,
        transparent 7px
      )
    `,
    backgroundSize: "16px 16px",
  }}
/>

      <motion.div
        style={{
          left: x,
          top: y,
        }}
        className="pointer-events-none absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-3xl"
      />

      {/* Pixel distortion overlay */}

      <motion.div
        style={{
          left: x,
          top: y,
        }}
        className="pointer-events-none absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-secondary) 1px, transparent 1px),
              linear-gradient(90deg,var(--color-secondary) 1px,transparent 1px)
            `,
            backgroundSize: "8px 8px",
            opacity: 0.18,
            filter: "blur(.3px)",
            maskImage:
              "radial-gradient(circle at center, black 35%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 35%, transparent 90%)",
          }}
        />
      </motion.div>

      {/* Huge Footer Text */}

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="
          pointer-events-none
          font-display
          text-center
          text-[18vw]
          md:text-[10vw]
          leading-none
          tracking-[-0.08em]
          text-[#F2DCC9]/5
          uppercase
          relative
          z-10
          whitespace-nowrap
        "
      >
        TERMINAL INVADERS
      </motion.h2>

      {/* Grain */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('/textures/noise.png')",
          backgroundSize: "180px",
        }}
      />
    </div>
  );
}