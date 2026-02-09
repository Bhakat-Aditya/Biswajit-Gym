import React from "react";
import { useNavigate } from "react-router-dom";

const GalleryPreview = ({ recentPhotos }) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white">
            Latest <span className="text-red-600">Shots</span>
          </h2>
          <button
            onClick={() => navigate("/gallery")}
            className="text-sm font-bold text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            VIEW ALL PHOTOS →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4">
          {recentPhotos.map((url, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-lg group ${i === 0 ? "col-span-2 row-span-2" : "col-span-1 h-40 md:h-auto"}`}
            >
              <img
                src={url}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Gym"
              />
            </div>
          ))}
        </div>
        {recentPhotos.length === 0 && (
          <p className="text-gray-600 text-sm">
            No photos yet. Add images to src/assets/gallery
          </p>
        )}
      </div>
    </section>
  );
};

export default GalleryPreview;
