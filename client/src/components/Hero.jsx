import React from "react";

const Hero = ({ scrollToForm }) => {
  // Prop kept if needed later, but unused for now
  return (
    <header className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://scontent.fccu35-1.fna.fbcdn.net/v/t39.30808-6/622852226_122164865900615778_3938908579682721278_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=CGHadcgDQrEQ7kNvwGQ102O&_nc_oc=AdkhG9QbCdvIWptvsHHdwnLhdj2sYABSZLTMiNOEzlPM339hbDNbE_0KcBqRXmTASvg&_nc_zt=23&_nc_ht=scontent.fccu35-1.fna&_nc_gid=B4tHLywkyIxEyECYGezlgg&oh=00_Afp6tUYpMw-0pGEz56fRRz2GvyxMC_FpkFMoYFqm7iAfMg&oe=698248E0')`,
          filter: "brightness(0.9)",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10"></div>
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
