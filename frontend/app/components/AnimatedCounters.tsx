"use client";

import { useEffect, useRef, useState } from "react";
import { statisticsData } from "../data/homepage";
import FadeIn from "./FadeIn";

function CounterItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => setCount(value));
      return () => cancelAnimationFrame(frame);
    }

    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * value);

      setCount(currentVal);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isIntersecting, value]);

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center justify-center p-8 bg-white border border-gray-150 rounded-[2.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(109,40,217,0.07)] hover:-translate-y-1 transition-all duration-300 w-full min-h-[160px] text-center"
    >
      <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-2">
        <span className="bg-gradient-to-r from-brandBlue to-brandPurple bg-clip-text text-transparent">
          {count}
          {suffix}
        </span>
      </div>
      <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

export default function AnimatedCounters({ memberCount }: { memberCount: number }) {
  if (!statisticsData || statisticsData.length === 0) return null;

  return (
    <section className="py-20 px-6 relative z-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {statisticsData.map((stat, i) => {
              const val = stat.label === "General Members" ? memberCount : stat.value;
              return (
                <CounterItem
                  key={`stat-${i}`}
                  value={val}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
