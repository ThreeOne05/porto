"use client";
import React from "react";
import { Boxes, MessagesSquare, UsersRound } from "lucide-react";

const ICONS = [UsersRound, Boxes, MessagesSquare];

interface OrbitScrollbarProps {
  dark: boolean;
  scrollIndex: number;
  handleOrbitClick: (idx: number) => void;
  pageCount: number;
}

const OrbitScrollbar: React.FC<OrbitScrollbarProps> = ({
  dark,
  scrollIndex,
  handleOrbitClick,
  pageCount,
}) => {
  const iconColor = dark ? "#fff" : "#222";
  const orbitBg = dark ? "bg-neutral-900" : "bg-neutral-200";
  return (
    <div
      className={`absolute left-0 right-0 flex items-center justify-center`}
      style={{
        bottom: 28,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      <div
        className={`${orbitBg} px-3 py-2 rounded-full flex gap-3 shadow-lg`}
        style={{
          pointerEvents: "auto",
          transition: "background 0.3s",
        }}
      >
        {ICONS.map((Icon, idx) => (
          <button
            disabled={idx >= pageCount}
            key={idx}
            tabIndex={0}
            style={{
              outline: "none",
              border: "none",
              background: "transparent",
              cursor: idx < pageCount ? "pointer" : "default",
              opacity: idx < pageCount ? 1 : 0.5,
              transform:
                idx === scrollIndex ? "scale(1.25) rotate(-15deg)" : "scale(1)",
              filter:
                idx === scrollIndex
                  ? "drop-shadow(0 2px 12px #facc15cc)"
                  : undefined,
              transition: "transform 0.2s, filter 0.2s, opacity 0.2s",
            }}
            onClick={() => handleOrbitClick(idx)}
          >
            <Icon
              size={32}
              color={idx === scrollIndex ? "#facc15" : iconColor}
              fill={idx === scrollIndex ? "#facc15" : "none"}
              style={{
                transition: "color 0.2s, fill 0.2s",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrbitScrollbar;
