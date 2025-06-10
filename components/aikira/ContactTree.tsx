import React, { useState } from "react";
import { Instagram, Linkedin, Phone } from "lucide-react";

type ContactItem = {
  name: string;
  link: string;
  icon: React.ReactNode;
};

const contacts: ContactItem[] = [
  {
    name: "AIKIRA_CODE",
    link: "https://www.instagram.com/aikira_code?igsh=N2UxbXV6dDIyeXd0",
    icon: <Instagram size={28} />,
  },
  {
    name: "MUH AIDIL ASRUL",
    link: "https://www.linkedin.com/in/muh-aidil-asrul-0328aa292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: <Linkedin size={28} />,
  },
  {
    name: "Aikira",
    link: "https://wa.me/qr/KHI27M372V4ZN1",
    icon: <Phone size={28} />,
  },
];

// Lebarkan orbit: gunakan radius orbit jauh lebih besar
const orbitRadii = [130, 195, 260]; // px

const ringColor = (i: number, dark: boolean) => {
  if (i === 0) return dark ? "ring-pink-400" : "ring-pink-600";
  if (i === 1) return dark ? "ring-blue-400" : "ring-blue-700";
  return dark ? "ring-green-400" : "ring-green-600";
};

const iconColor = (i: number, dark: boolean, hovered: boolean) => {
  if (hovered) {
    if (i === 0) return "text-pink-500";
    if (i === 1) return "text-blue-600";
    return "text-green-600";
  }
  return dark ? "text-yellow-400" : "text-black";
};

const ContactTree: React.FC<{ dark: boolean }> = ({ dark }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  // Center coordinates and canvas size for orbits
  const center = 340; // px, for very large orbits
  const canvasSize = center * 2; // 680x680px
  const sunSize = 90; // px
  const planetSize = 58; // px

  const nodeBg = dark ? "bg-[#181818]" : "bg-white";
  const nodeBorder = dark ? "border-yellow-400" : "border-black";
  const labelBg = dark
    ? "bg-black/70 text-yellow-300"
    : "bg-yellow-100 text-black";
  const sunBg = dark ? "bg-yellow-400 text-black" : "bg-yellow-300 text-black";
  const sunShadow = dark
    ? "shadow-[0_0_44px_10px_rgba(251,191,36,0.20)]"
    : "shadow-[0_0_44px_10px_rgba(253,224,71,0.13)]";

  // Each planet on its own orbit, at a different angle
  // (0deg = top, 120deg = bottom left, 240deg = bottom right)
  const planetAngles = [270, 30, 150]; // degrees

  return (
    <div
      className="w-full flex flex-col items-center justify-center py-8 select-none"
      style={{ overflowX: "auto" }}
    >
      <div
        className="relative"
        style={{
          width: canvasSize,
          height: canvasSize,
          minWidth: canvasSize,
          minHeight: canvasSize,
        }}
      >
        {/* Orbit rings */}
        {orbitRadii.map((radius, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 z-0 pointer-events-none"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg width={canvasSize} height={canvasSize}>
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke={dark ? "#facc15" : "#fbbf24"}
                strokeWidth="2.2"
                fill="none"
                className="opacity-25"
              />
            </svg>
          </div>
        ))}

        {/* Sun (center) */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center border-4 border-white ${sunBg} ${sunShadow} shadow-lg z-10 select-none`}
          style={{
            width: sunSize,
            height: sunSize,
            textShadow: "0 2px 12px #facc15aa",
            letterSpacing: 2,
            fontFamily: "monospace",
            fontSize: 48,
            fontWeight: 800,
            userSelect: "none",
          }}
        >
          A
        </div>

        {/* Planets: each on its own orbit at a unique angle */}
        {contacts.map((c, i) => {
          const angleRad = (planetAngles[i] * Math.PI) / 180;
          const x = center + orbitRadii[i] * Math.cos(angleRad);
          const y = center + orbitRadii[i] * Math.sin(angleRad);

          return (
            <div
              key={c.name}
              className="absolute"
              style={{
                left: x,
                top: y,
                width: planetSize,
                height: planetSize,
                marginLeft: -planetSize / 2,
                marginTop: -planetSize / 2,
                zIndex: hovered === i ? 20 : 9,
                pointerEvents: "auto",
                animation: `planetCircle${i} 12s linear infinite`,
                transformOrigin: `${center - x + planetSize / 2}px ${
                  center - y + planetSize / 2
                }px`,
                // Each planet starts at its own angle
                animationDelay: `${i * 0.4}s`,
              }}
            >
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  rounded-full w-14 h-14 flex items-center justify-center border-2 
                  ${ringColor(
                    i,
                    dark
                  )} ${nodeBg} ${nodeBorder} transition-all duration-200
                  hover:scale-110 hover:ring-4 focus:ring-4 outline-none group shadow-md
                `}
                style={{
                  boxShadow:
                    hovered === i
                      ? `0 0 0 7px #fde04744, 0 2px 12px 0 rgba(251,191,36,0.16)`
                      : "0 2px 12px 0 rgba(251,191,36,0.10)",
                }}
                tabIndex={0}
              >
                <span
                  className={`
                    transition-colors duration-200
                    ${iconColor(i, dark, hovered === i)}
                  `}
                >
                  {c.icon}
                </span>
              </a>
              {/* Name toggle */}
              <div
                className={`
                  transition-all duration-200 flex items-center mt-2
                  ${
                    hovered === i
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }
                `}
                style={{
                  justifyContent: "center",
                }}
              >
                <span
                  className={`
                    font-semibold text-xs px-2 py-1 rounded-md shadow ${labelBg}
                  `}
                >
                  {c.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* Keyframes: each planet animates its own full circle on its own orbit */}
        <style jsx>{`
          @keyframes planetCircle0 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes planetCircle1 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes planetCircle2 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContactTree;
