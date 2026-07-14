"use client"

import { motion } from "framer-motion";

export default function ArchDiagram() {
  // CLI <-> Server -> Web
  return (
    <svg
      viewBox="0 0 720 160"
      className="w-full max-w-3xl"
      aria-hidden
    >
      <defs>
        <marker
          id="arrow-fg"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-foreground)" />
        </marker>
      </defs>

      {/* Nodes */}
      <Node x={40} y={55} w={140} h={60} label="CLI" />
      <Node x={290} y={55} w={140} h={60} label="Server" />
      <Node x={540} y={55} w={140} h={60} label="Web" />

      {/* CLI -> Server (top arrow) */}
      <motion.path
        d="M 180 78 L 290 78"
        fill="none"
        stroke="var(--color-foreground)"
        strokeWidth="1.5"
        markerEnd="url(#arrow-fg)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      {/* Server -> CLI (bottom arrow) */}
      <motion.path
        d="M 290 96 L 180 96"
        fill="none"
        stroke="var(--color-foreground)"
        strokeWidth="1.5"
        markerEnd="url(#arrow-fg)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeInOut", delay: 0.15 }}
      />
      {/* Server -> Web */}
      <motion.path
        d="M 430 85 L 540 85"
        fill="none"
        stroke="var(--color-foreground)"
        strokeWidth="1.5"
        markerEnd="url(#arrow-fg)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  );
}

function Node({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        ry={10}
        fill="none"
        stroke="var(--color-foreground)"
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 6}
        textAnchor="middle"
        fill="var(--color-foreground)"
        fontFamily="var(--font-display)"
        fontSize="20"
        letterSpacing="1"
      >
        {label}
      </text>
    </g>
  );
}