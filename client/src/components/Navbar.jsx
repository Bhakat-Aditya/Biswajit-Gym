import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onOpenBmi }) => {
  const navigate = useNavigate();
  const GYM_NAME = "SPORTS COMPLEX";
  const GYM_SUB = "MULTI GYM";

  return (
    <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px] transition-all duration-300">
      <div
        className="flex flex-col leading-none group cursor-pointer"
        onClick={() => window.scrollTo(0, 0)}
      >
        <h1 className="text-xl md:text-2xl font-black tracking-tighter italic text-white group-hover:text-red-500 transition-colors">
          {GYM_NAME}
        </h1>
        <span className="text-xs font-bold text-red-600 tracking-widest group-hover:text-white transition-colors">
          {GYM_SUB}
        </span>
      </div>
      <div className="flex gap-4">
        {/* BMI BUTTON */}
        <button
          onClick={onOpenBmi}
          className="text-[10px] md:text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"
        >
          BMI CHECK
        </button>

        <button
          onClick={() => navigate("/gallery")}
          className="text-[10px] md:text-xs font-bold text-gray-300 hover:text-white transition-colors border border-transparent hover:border-white px-3 py-2 rounded-full"
        >
          GALLERY
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
