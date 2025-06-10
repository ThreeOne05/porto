"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FONT_CLASSES = [
  "font-pixel", // Press Start 2P (Pixel)
  "font-caveat", // Caveat (Handwriting)
  "font-mono", // JetBrains Mono (Monospace)
  "font-bungee", // Bungee (Display)
  "font-indie", // Indie Flower (Sketch)
  "font-major", // Major Mono Display
  "font-space", // Space Grotesk
  "font-permanent", // Permanent Marker
  "font-ibm", // IBM Plex Mono
  "font-rubik", // Rubik Moonrocks
];

export default function Hero() {
  const [fontIdx, setFontIdx] = useState(0);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnim(true);
      setTimeout(() => setAnim(false), 280);
      setFontIdx((prev) => (prev + 1) % FONT_CLASSES.length);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-black via-zinc-900 to-gray-900 select-none overflow-hidden">
      {/* Bubble/Lingkaran Radial Hitam Putih di Background */}
      <div className="absolute z-0 top-1/4 left-1/4 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-white/80 via-white/40 to-black/20 blur-3xl animate-bubble1 pointer-events-none"></div>
      <div className="absolute z-0 bottom-10 right-1/4 w-[260px] h-[260px] rounded-full bg-gradient-to-br from-white/60 via-white/30 to-black/10 blur-2xl animate-bubble2 pointer-events-none"></div>
      <div className="absolute z-0 top-2/3 left-10 w-[120px] h-[120px] rounded-full bg-gradient-to-tl from-white/70 to-black/10 blur-xl animate-bubble3 pointer-events-none"></div>

      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col items-center">
        <span
          className={`text-8xl sm:text-9xl text-white drop-shadow-2xl transition-all duration-300 ease-in-out ${
            FONT_CLASSES[fontIdx]
          } ${anim ? "animate-pop" : ""}`}
          aria-label="A"
        >
          A
        </span>

        <Link
          href="/Aikira"
          className="group mt-10 relative focus:outline-none"
        >
          <span className="relative inline-block px-14 py-4 rounded-full font-bold uppercase text-lg tracking-widest bg-white text-black border-2 border-black shadow-xl transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:shadow-none focus:outline-none overflow-hidden">
            <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.35em]">
              Go to Aikira
            </span>
            {/* Garis animasi bawah saat hover */}
            <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-2 w-3/4 h-[2px] bg-black opacity-0 group-hover:opacity-70 group-hover:scale-x-110 transition-all duration-300" />
            <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-2 w-1/2 h-[2px] bg-white opacity-0 group-hover:opacity-70 group-hover:scale-x-125 transition-all duration-300" />
          </span>
        </Link>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Press+Start+2P|Caveat:700|Bungee|Indie+Flower|Major+Mono+Display|Space+Grotesk:700|Permanent+Marker|IBM+Plex+Mono:700|Rubik+Moonrocks&display=swap");
        @font-face {
          font-family: "JetBrains Mono";
          src: url("https://fonts.gstatic.com/s/jetbrainsmono/v13/1Ptgg87LROyAm0K08i4gS7luGkW6.woff2")
            format("woff2");
          font-weight: 700;
          font-style: normal;
        }
        .font-pixel {
          font-family: "Press Start 2P", monospace !important;
          letter-spacing: 0.02em;
        }
        .font-caveat {
          font-family: "Caveat", cursive !important;
          font-weight: 700;
        }
        .font-bungee {
          font-family: "Bungee", cursive !important;
        }
        .font-indie {
          font-family: "Indie Flower", cursive !important;
        }
        .font-major {
          font-family: "Major Mono Display", monospace !important;
        }
        .font-space {
          font-family: "Space Grotesk", sans-serif !important;
          font-weight: 700;
        }
        .font-permanent {
          font-family: "Permanent Marker", cursive !important;
        }
        .font-ibm {
          font-family: "IBM Plex Mono", monospace !important;
          font-weight: 700;
        }
        .font-rubik {
          font-family: "Rubik Moonrocks", cursive !important;
        }
        .font-mono {
          font-family: "JetBrains Mono", monospace !important;
        }
        @keyframes pop {
          0% {
            transform: scale(1) rotate(-3deg);
            opacity: 1;
          }
          40% {
            transform: scale(1.22) rotate(3deg);
            opacity: 0.94;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .animate-pop {
          animation: pop 0.28s cubic-bezier(0.65, 1.5, 0.55, 1.3);
        }
        @keyframes bubble1 {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-22px) scale(1.07);
          }
        }
        @keyframes bubble2 {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(16px) scale(1.06);
          }
        }
        @keyframes bubble3 {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
        .animate-bubble1 {
          animation: bubble1 7s ease-in-out infinite;
        }
        .animate-bubble2 {
          animation: bubble2 8s ease-in-out infinite;
        }
        .animate-bubble3 {
          animation: bubble3 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
