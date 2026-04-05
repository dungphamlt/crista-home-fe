"use client";

import { useScrollRevealOnce } from "@/hooks/useScrollRevealOnce";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionHidden: Record<
  NonNullable<ScrollRevealProps["direction"]>,
  string
> = {
  up: "opacity-0 translate-y-10",
  down: "opacity-0 -translate-y-10",
  left: "opacity-0 translate-x-10",
  right: "opacity-0 -translate-x-10",
};

const directionVisible =
  "opacity-100 translate-x-0 translate-y-0";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const { ref, visible } = useScrollRevealOnce();

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out will-change-transform ${
        visible ? directionVisible : directionHidden[direction]
      } ${className}`}
      style={{
        transitionDelay: visible ? `${delay}s` : undefined,
      }}
    >
      {children}
    </div>
  );
}
