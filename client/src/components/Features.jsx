import React from "react";

const Features = () => {
  return (
    <section className="features-section py-24 px-6 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <h2 className="text-4xl md:text-7xl font-black uppercase text-white">
            Why <span className="text-zinc-600">Us?</span>
          </h2>
          <p className="text-gray-400 max-w-md text-right mt-4 md:mt-0">
            Experience the best ambience in West Bengal. Separate facilities,
            premium equipment, and expert guidance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Modern Facilities",
              desc: "High-quality biomechanical machines & motivating atmosphere.",
              icon: "🏋️‍♂️",
            },
            {
              title: "Expert Guidance",
              desc: "Certified floor trainers always present to guide your form.",
              icon: "🧠",
            },
            {
              title: "Comfort & Privacy",
              desc: "Separate changing rooms & washrooms for men and women.",
              icon: "✨",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="feature-card group p-8 bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-colors duration-300 relative overflow-hidden rounded-lg"
            >
              <div className="text-6xl mb-4 grayscale group-hover:grayscale-0 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold uppercase mb-4 text-white group-hover:text-red-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
