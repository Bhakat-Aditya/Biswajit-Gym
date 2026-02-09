import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = ({ scrollToPlans }) => {
  const navigate = useNavigate();
  const GYM_NAME = "SPORTS COMPLEX";
  const GYM_SUB = "MULTI GYM";
  const MAP_LINK = "https://maps.app.goo.gl/ddvZQeVLhZwnAwQq8";

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 text-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-red-900/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-6">
          <div className="flex flex-col leading-none">
            <h1 className="text-3xl font-black italic tracking-tighter text-white">
              {GYM_NAME}
            </h1>
            <span className="text-sm font-bold text-red-600 tracking-widest">
              {GYM_SUB}
            </span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Forging elite fitness in Midnapore since 2024. Join a community
            dedicated to strength, discipline, and results.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold uppercase mb-6 text-white border-b border-zinc-800 pb-2 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <button
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-red-500 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/gallery")}
                className="hover:text-red-500 transition-colors"
              >
                Gallery
              </button>
            </li>
            <li>
              <button
                onClick={scrollToPlans}
                className="hover:text-red-500 transition-colors"
              >
                Membership Plans
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold uppercase mb-6 text-white border-b border-zinc-800 pb-2 inline-block">
            Contact
          </h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-red-600 mt-1">📍</span>
              <span>
                Inside Mindapore Sport Complex
                <br />
                Midnapore, West Bengal
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-red-600">📞</span>
              <a
                href="tel:+917679586723"
                className="hover:text-white transition-colors"
              >
                +91 76795 86723
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-red-600">✉️</span>
              <a
                href="mailto:biswajitdas.93.mid@gmail.com"
                className="hover:text-white transition-colors"
              >
                biswajitdas.93.mid@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold uppercase mb-2 text-white border-b border-zinc-800 pb-2 inline-block">
            Find Us
          </h3>
          <div className="w-full h-40 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58968.61633596708!2d87.2831!3d22.4277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d416a9a3b6f0f%3A0x6b2b6b6b6b6b6b6b!2sMidnapore%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(90%)" }}
              allowFullScreen=""
              loading="lazy"
              className="group-hover:opacity-70 transition-opacity"
            ></iframe>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="bg-red-600 text-white px-4 py-2 text-xs font-bold rounded-full uppercase shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                Open in Maps ↗
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-16 border-t border-zinc-900 pt-8 text-center">
        <p className="text-zinc-600 text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} {GYM_NAME} {GYM_SUB}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
