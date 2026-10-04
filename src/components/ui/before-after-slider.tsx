"use client";

import { useState } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Eski Hali",
  afterLabel = "Yeni Hali",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl group border-4 border-white bg-zinc-100">
      
      {/* After Image (Background) */}
      <Image 
        src={afterImage} 
        alt={afterLabel} 
        fill 
        className="object-cover pointer-events-none" 
        priority
      />
      <div className="absolute top-6 right-6 z-20 bg-white/95 text-zinc-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg transition-transform duration-300">
        {afterLabel}
      </div>

      {/* Before Image (Foreground with Clip Path) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image 
          src={beforeImage} 
          alt={beforeLabel} 
          fill 
          className="object-cover grayscale pointer-events-none" 
          priority
        />
        <div className="absolute top-6 left-6 bg-zinc-900/95 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg transition-transform duration-300">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.6)] pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-black/60 text-[#E58C36] border-4 border-white ring-4 ring-black/10">
          <GripVertical className="w-7 h-7" />
        </div>
      </div>

      {/* Invisible Input Range Slider for flawless touch/mouse support */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize m-0 touch-pan-y"
      />
      
    </div>
  );
}
