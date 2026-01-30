import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Gallery = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/gallery`);
      setPhotos(res.data.data);
      setLoading(false);

      // Animation after load
      setTimeout(() => {
        gsap.from(".gallery-item", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        });
      }, 100);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
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
          className="text-xs font-bold text-gray-400 hover:text-white"
        >
          BACK TO HOME
        </button>
      </nav>

      <div className="pt-32 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-12">
          Hall of <span className="text-red-600">Flame</span>
        </h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading shots...</div>
        ) : (
          <div className="columns-1 md:columns-3 gap-4 space-y-4">
            {photos.map((photo) => (
              <div
                key={photo._id}
                className="gallery-item break-inside-avoid relative group overflow-hidden rounded-lg border border-zinc-800"
              >
                <img
                  src={photo.photoUrl}
                  alt="Gym Moment"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-xs text-gray-300 font-mono">
                    Uploaded: {new Date(photo.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {photos.length === 0 && !loading && (
          <p className="text-center text-gray-500">No photos uploaded yet.</p>
        )}
      </div>

      <footer className="py-8 mt-12 text-center text-zinc-600 text-xs">
        &copy; {new Date().getFullYear()} SPORTS COMPLEX MULTI GYM
      </footer>
    </div>
  );
};

export default Gallery;
