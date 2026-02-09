import React from "react";

const Hero = () => {
  return (
    <header className="relative h-screen w-full overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero.jpg')`,
          filter: "brightness(0.9)",
        }}
      ></div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10"></div>

      {/* CONTENT */}
      <div className="relative z-20 h-full flex flex-col justify-end items-center pb-32 px-4 text-center hero-content">
        <h1 className="text-5xl md:text-[8rem] leading-[0.9] font-black uppercase italic tracking-tighter text-white drop-shadow-2xl mb-4">
          <span className="text-red-600 block md:inline">SPORTS</span> COMPLEX
          <span className="block text-white text-4xl md:text-[6rem]">
            MULTI GYM
          </span>
        </h1>

        <div className="w-32 h-2 bg-red-600 mb-6"></div>

        <p className="text-xl md:text-3xl font-bold uppercase tracking-[0.3em] text-gray-200 text-shadow-md">
          For Men & Women
        </p>
      </div>
    </header>
  );
};

export default Hero;
