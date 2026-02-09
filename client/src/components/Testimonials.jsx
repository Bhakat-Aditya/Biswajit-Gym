import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Sandeep Ghosh",
      role: "Member since 2024",
      text: "Best gym in Midnapore! The equipment is top-notch and the biomechanics really help in hitting the muscle right. Rahul sir is very helpful.",
      stars: 5,
    },
    {
      name: "Priya Mallick",
      role: "Weight Loss Program",
      text: "I was intimidated at first, but the 'Zero-Intimidation' policy is real. Lost 8kgs in 3 months with proper guidance. Highly recommend!",
      stars: 5,
    },
    {
      name: "Arjun Das",
      role: "Bodybuilding",
      text: "The vibe here is different. No nonsense, just hard work. If you are serious about gains, this is the place. Open till 11 PM is a lifesaver.",
      stars: 5,
    },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      {/* Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-center mb-16 text-white">
          Real <span className="text-red-600">Talk</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-black border border-zinc-800 p-8 rounded-xl relative hover:border-red-600 transition-colors duration-300 group"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 text-6xl text-zinc-800 font-serif leading-none group-hover:text-red-900/50 transition-colors">
                “
              </div>

              <div className="relative z-10">
                <div className="flex text-yellow-500 mb-4 text-lg">
                  {"★".repeat(review.stars)}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="border-t border-zinc-800 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase text-sm">
                      {review.name}
                    </h4>
                    <p className="text-xs text-red-500 font-bold tracking-wider">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
