import React from "react";

const Marquee = () => {
  return (
    <div className="relative z-30 transform -rotate-2 origin-left scale-110 border-y-8 border-black shadow-2xl mt-[-50px] mb-10">
      <div className="bg-black py-3 border-b-4 border-zinc-800 overflow-hidden">
        <div className="marquee-track-right flex whitespace-nowrap">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              className="text-2xl md:text-4xl font-black text-white px-8 uppercase italic"
            >
              UNLEASH THE BEAST • YOUR TIME IS NOW • SWEAT IS GLORY •
            </span>
          ))}
        </div>
      </div>
      <div className="bg-red-600 py-3 overflow-hidden">
        <div className="marquee-track-left flex whitespace-nowrap">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              className="text-2xl md:text-4xl font-black text-black px-8 uppercase italic"
            >
              NO SHORTCUTS • JUST RESULTS • IRON THERAPY • GRIND DONT STOP •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
