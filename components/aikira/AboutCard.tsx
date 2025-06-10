"use client";
import React from "react";

type AboutCardProps = {
  dark: boolean;
};

const AboutCard: React.FC<AboutCardProps> = ({ dark }) => {
  const boxBg = dark ? "bg-neutral-800" : "bg-neutral-100";
  const labelText = dark ? "text-gray-200" : "text-neutral-700";
  const valueText = dark ? "text-white" : "text-black";

  return (
    <div className="flex flex-row items-center gap-8 px-16">
      {/* BOX PROFILE */}
      <div
        className={`w-96 h-96 rounded-t-[40px] rounded-b-xl overflow-hidden flex items-center justify-center shadow-xl border-2 ${boxBg} border-neutral-400/30`}
      >
        <img
          src="/aikira.png"
          alt="aikira"
          className="object-cover w-full h-full"
          draggable={false}
        />
      </div>
      {/* INFO */}
      <div className="flex flex-col gap-2 mr-12">
        <div className="overflow-hidden">
          <h2 className={`text-7xl font-bold ${valueText} animate-bounce-text`}>
            Aikira
          </h2>
        </div>
        <div className="flex gap-2 items-center">
          <span
            className={`text-2xl font-semibold px-3 py-1 rounded-full ${
              dark
                ? "bg-gradient-to-r from-white to-neutral-600 text-black"
                : "bg-gradient-to-r from-black to-gray-400 text-white"
            }`}
          >
            Fullstack
          </span>
        </div>
        <div className="mt-4 space-y-3">
          <div className="space-y-4 max-w-md">
            <p
              className={`text-xl font-light leading-relaxed ${labelText} tracking-wide`}
            >
              Crafting exceptional digital experiences through innovative web
              solutions
            </p>
            <p className={`text-base ${labelText} opacity-80 leading-relaxed`}>
              Specialized in building Web Applications
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div
                className={`w-12 h-[1px] ${
                  dark ? "bg-white" : "bg-black"
                } opacity-30`}
              ></div>
              <span
                className={`text-sm font-medium ${labelText} opacity-60 tracking-wider uppercase`}
              >
                For Program
              </span>
            </div>
          </div>
        </div>
        <div className="w-96 overflow-hidden px-16 rounded-3xl">
          <div className="flex animate-scroll gap-8 w-max">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-8">
                {[...Array(12)].map((_, logoIndex) => (
                  <div key={logoIndex} className="flex-shrink-0">
                    <img
                      src={`/logo/logo${logoIndex + 1}.svg`}
                      alt={`logo ${logoIndex + 1}`}
                      className={`w-14 h-14 object-contain ${
                        dark ? "filter invert" : ""
                      }`}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
