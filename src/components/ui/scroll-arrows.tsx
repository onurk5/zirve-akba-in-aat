"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function ScrollArrows({ targetId }: { targetId: string }) {
  const scroll = (direction: "left" | "right") => {
    const el = document.getElementById(targetId);
    if (el) {
      const scrollAmount = direction === "left" ? -el.clientWidth : el.clientWidth;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
