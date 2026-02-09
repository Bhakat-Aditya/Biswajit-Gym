import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

// --- LOAD LOCAL IMAGES AUTOMATICALLY ---
// This requires you to put images in client/src/assets/gallery
// The glob pattern loads .png, .jpg, .jpeg, .webp files
const localImages = import.meta.glob(
  "../assets/gallery/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);
const photos = Object.values(localImages);

const Gallery = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Animation triggers when component mounts
  useEffect(() => {
    if (photos.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".gallery-item",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        );
      }, containerRef);

      return () => ctx.revert(); // Cleanup
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600">
      {/* Nav */}
      <nav className="fixed w-full z-50 p-6 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/10">
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-black italic tracking-tighter cursor-pointer"
        >
          SPORTS COMPLEX <span className="text-red-600">GALLERY</span>
        </h1>
        <button
          onClick={() => navigate("/")}
          className="text-xs font-bold text-gray-400 hover:text-white transition-colors"
        >
          BACK TO HOME
        </button>
      </nav>

      <div className="pt-32 px-4 md:px-12 max-w-7xl mx-auto" ref={containerRef}>
        <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-4">
          Hall of <span className="text-red-600">Flame</span>
        </h2>
        <p className="text-center text-gray-500 mb-12 uppercase tracking-widest text-sm">
          Snapshots from the Grind
        </p>

        {photos.length === 0 ? (
          <div className="text-center py-20 border border-zinc-800 rounded bg-zinc-900/50">
            <p className="text-gray-500">
              No photos found. Please add images to <br />
              <code className="text-red-400">client/src/assets/gallery/</code>
            </p>
          </div>
        ) : (
          // Using columns for Masonry layout
          <div className="columns-1 md:columns-3 gap-4 space-y-4">
            {photos.map((url, index) => (
              <div
                key={index}
                className="gallery-item break-inside-avoid relative group overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
              >
                <img
                  src={url}
                  alt={`Gym Moment ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay - visible on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-xs text-gray-300 font-mono">#GRIND</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="py-8 mt-12 text-center text-zinc-600 text-xs border-t border-zinc-900">
        &copy; {new Date().getFullYear()} SPORTS COMPLEX MULTI GYM
      </footer>
    </div>
  );
};

export default Gallery;
