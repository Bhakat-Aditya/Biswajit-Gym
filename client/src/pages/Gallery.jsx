import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Gallery = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  // --- FIX: Animation triggers ONLY when 'photos' state changes ---
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
  }, [photos]);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/gallery`);
      setPhotos(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

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

        {loading ? (
          <div className="text-center text-gray-500 animate-pulse">
            Loading shots...
          </div>
        ) : (
          // Using columns for Masonry layout
          <div className="columns-1 md:columns-3 gap-4 space-y-4">
            {photos.map((photo) => (
              <div
                key={photo._id}
                className="gallery-item break-inside-avoid relative group overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
              >
                <img
                  src={photo.photoUrl}
                  alt="Gym Moment"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay - visible on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-xs text-gray-300 font-mono">
                    {new Date(photo.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {photos.length === 0 && !loading && (
          <div className="text-center py-20 border border-zinc-800 rounded bg-zinc-900/50">
            <p className="text-gray-500">No photos uploaded yet.</p>
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
