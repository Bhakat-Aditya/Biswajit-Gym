import React from "react";

const Pricing = () => {
  return (
    <section className="plans-section py-24 px-6 bg-black relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 text-white">
          <span className="text-red-600">Invest</span> In Yourself
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Monthly */}
          <div className="plan-card p-8 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300 flex flex-col rounded-xl">
            <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">
              Starter
            </h3>
            <div className="text-4xl font-black text-white mb-2">
              ₹600<span className="text-lg font-medium text-gray-500">/mo</span>
            </div>
            <p className="text-red-500 text-xs font-bold uppercase mb-6 tracking-wider">
              + ₹1000 Admission Fee
            </p>
            <ul className="space-y-4 text-gray-300 text-sm mb-8 flex-1">
              <li>✓ Full Gym Access</li>
              <li>✓ Floor Trainer Guidance</li>
              <li>✓ Shelf Storage</li>
            </ul>
          </div>
          {/* Yearly */}
          <div className="plan-card p-8 border-2 border-red-600 bg-zinc-900 relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(220,38,38,0.3)] flex flex-col rounded-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
              Best Value
            </div>
            <h3 className="text-xl font-bold text-red-500 uppercase tracking-widest mb-2">
              Commitment
            </h3>
            <div className="text-5xl font-black text-white mb-2">₹5500</div>
            <p className="text-green-500 text-xs font-bold uppercase mb-6 tracking-wider">
              NO ADMISSION FEE
            </p>
            <ul className="space-y-4 text-gray-300 text-sm mb-8 flex-1">
              <li>
                ✓ <span className="font-bold">12 Months Access</span>
              </li>
              <li>✓ Zero Admission Charges</li>
              <li>✓ Full Facility Access</li>
            </ul>
          </div>
          {/* Half Yearly */}
          <div className="plan-card p-8 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300 flex flex-col rounded-xl">
            <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">
              Steady
            </h3>
            <div className="text-4xl font-black text-white mb-2">₹3000</div>
            <p className="text-green-500 text-xs font-bold uppercase mb-6 tracking-wider">
              NO ADMISSION FEE
            </p>
            <ul className="space-y-4 text-gray-300 text-sm mb-8 flex-1">
              <li>✓ 6 Months Access</li>
              <li>✓ Zero Admission Charges</li>
              <li>✓ Floor Trainer Guidance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
