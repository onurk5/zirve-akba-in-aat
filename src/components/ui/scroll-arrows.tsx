"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback } from "react";

export function ScrollArrows({ 
  targetId, 
  overlay = false,
  autoScroll = false,
  interval = 4000
}: { 
  targetId: string, 
  overlay?: boolean,
  autoScroll?: boolean,
  interval?: number
}) {
  
  const scroll = useCallback((direction: "left" | "right") => {
    const el = document.getElementById(targetId);
    if (el) {
      // Find one item's width (assuming all children have same width for snapping)
      // or just scroll by container width. 
      // For smooth snap, scrolling by container width / 2 or full width works.
      const scrollAmount = direction === "left" ? -el.clientWidth : el.clientWidth;
      
      // If reached the end, go back to start
      if (direction === "right" && el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } 
      // If at the start and scrolling left, go to end
      else if (direction === "left" && el.scrollLeft <= 10) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      } 
      else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  }, [targetId]);

  useEffect(() => {
    if (!autoScroll) return;
    
    const timer = setInterval(() => {
      scroll("right");
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoScroll, interval, scroll]);

  if (overlay) {
    return (
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:hidden pointer-events-none z-10">
        <button onClick={() => scroll("left")} className="pointer-events-auto w-10 h-10 rounded-full border border-zinc-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-zinc-800 hover:bg-white transition-colors shadow-lg active:scale-95">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => scroll("right")} className="pointer-events-auto w-10 h-10 rounded-full border border-zinc-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-zinc-800 hover:bg-white transition-colors shadow-lg active:scale-95">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-end gap-3 md:hidden mt-6">
      <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors shadow-sm active:scale-95">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors shadow-sm active:scale-95">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
