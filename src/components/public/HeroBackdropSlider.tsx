"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const HERO_SLIDES = [
  {
    src: "/images/hero-legavis-dpr.jpg",
    alt: "Kunjungan Studi Legislatif (LEGAVIS) Parlemen Cakrasena BLM FEB UNAIR di Gedung DPR/MPR RI",
    caption: "LEGAVIS • DPR/MPR RI",
  },
  {
    src: "/images/hero-sidang-parlemen.jpg",
    alt: "Suasana Ruang Sidang Parlemen Badan Legislatif Mahasiswa FEB UNAIR",
    caption: "Sidang Parlemen",
  },
  {
    src: "/images/hero-gedung-institusi.jpg",
    alt: "Kunjungan Studi Kelembagaan dan Regulasi Nasional BLM FEB UNAIR",
    caption: "Kunjungan Kelembagaan",
  },
];

export function HeroBackdropSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Background Photos with Smooth Crossfade */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center scale-[1.01]"
            />
          </div>
        ))}

        {/* Dark Overlays matching FEB UNAIR Hero contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      </div>

      {/* Solid Boxy Slide Controls at Bottom Right */}
      <div className="absolute bottom-5 right-4 sm:right-8 z-20 hidden sm:flex items-center gap-3 bg-[#0F294A]/90 border border-white/20 px-3.5 py-2 rounded-md backdrop-blur-xs">
        <span className="text-[11px] font-bold text-white">
          {HERO_SLIDES[activeIndex].caption}
        </span>
        <div className="flex items-center gap-1.5">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Tampilkan foto ${index + 1}: ${slide.caption}`}
              className={`h-2 rounded-xs transition-all cursor-pointer ${
                index === activeIndex
                  ? "w-6 bg-[#b96d41]"
                  : "w-2 bg-white/40 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
