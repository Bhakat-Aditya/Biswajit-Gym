import React from "react";

const Trainers = () => {
  // EDIT THIS ARRAY TO UPDATE TRAINERS
  const trainers = [
    {
      name: "Rahul Roy",
      role: "Head Coach",
      // You can put a URL here or import a local image like the gallery
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Amit Singh",
      role: "Strength Trainer",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    }
  ];

  return (
    <section className="py-24 px-6 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-16 text-center">
          Meet The <span className="text-red-600">Trainers</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
            >
              {/* Image */}
              <div className="h-80 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-2xl font-black text-white uppercase italic">
                  {trainer.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
