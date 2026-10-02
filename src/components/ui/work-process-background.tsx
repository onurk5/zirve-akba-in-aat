"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/hero-bg-2.jpg",
  "/project-1.jpg",
  "/project-2.jpg",
  "/feature-1.jpg",
];

export function WorkProcessBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4 saniyede bir slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((img, idx) => (
        <div 
          key={img}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
            idx === currentIndex ? 'opacity-[0.08] scale-[1.02]' : 'opacity-0 scale-100'
          }`}
        >
          <Image src={img} alt="Mimari Arkaplan" fill className="object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,140,54,0.07),transparent_70%)]"></div>
    </div>
  );
}
