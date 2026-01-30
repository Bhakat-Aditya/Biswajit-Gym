import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const formRef = useRef(null);

  // BRANDING
  const GYM_NAME = "SPORTS COMPLEX";
  const GYM_SUB = "MULTI GYM";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    weight: "",
    height: "",
  });
  const [recentPhotos, setRecentPhotos] = useState([]);

  // Fetch recent photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/gallery?limit=6`,
        );
        setRecentPhotos(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPhotos();
  }, []);
  // --- ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Stagger
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-text-char", {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out",
          delay: 0.2,
        })
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from(
          ".hero-btn",
          { scale: 0, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.3",
        );

      // 2. Marquee Scroll Effect
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 10,
        repeat: -1,
      });

      // 3. Feature Cards Fade Up
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });

      // 4. Membership Cards Scale In
      gsap.from(".plan-card", {
        scrollTrigger: {
          trigger: ".plans-section",
          start: "top 75%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/leads`,
        formData,
      );
      alert("🔥 BEAST MODE ACTIVATED! We will contact you shortly.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        age: "",
        weight: "",
        height: "",
      });
    } catch (err) {
      alert("Error sending request. Please check your connection.");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const scrollToForm = () =>
    formRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      ref={mainRef}
      className="bg-black text-white min-h-screen overflow-x-hidden font-sans selection:bg-red-600 selection:text-white"
    >
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="flex flex-col leading-none">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter italic text-white">
            {GYM_NAME}
          </h1>
          <span className="text-xs font-bold text-red-600 tracking-widest">
            {GYM_SUB}
          </span>
        </div>
        <button
          onClick={() => navigate("/admin-login")}
          className="text-[10px] md:text-xs font-bold text-zinc-600 hover:text-white transition-colors border border-transparent hover:border-zinc-700 px-3 py-1 rounded-full"
        >
          OWNER ACCESS
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 via-black to-black z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>

        <div className="z-10 relative mt-16">
          <h1 className="text-6xl md:text-[9rem] font-black uppercase leading-[0.9] tracking-tighter mb-6 mix-blend-difference">
            <div className="overflow-hidden">
              <span className="hero-text-char inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
                PAIN IS
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-text-char inline-block text-red-600">
                TEMPORARY
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-text-char inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
                GLORY IS
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-text-char inline-block text-white">
                FOREVER
              </span>
            </div>
          </h1>

          <p className="hero-sub text-gray-400 text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-light">
            Midnapore's Premier Fitness Hub. <br />
            <span className="text-white font-bold">
              Sculpt your body. Forge your mind.
            </span>
          </p>

          <button
            onClick={scrollToForm}
            className="hero-btn group relative px-8 py-4 bg-red-600 text-white font-black text-xl uppercase tracking-widest overflow-hidden skew-x-[-10deg] hover:bg-white hover:text-red-600 transition-colors duration-300"
          >
            <span className="inline-block skew-x-[10deg]">Join The Tribe</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </header>

      {/* --- INFINITE MARQUEE --- */}
      <div className="bg-red-600 py-4 overflow-hidden -rotate-1 border-y-4 border-black z-20 relative">
        <div className="marquee-track flex whitespace-nowrap">
          <span className="text-4xl md:text-6xl font-black text-black px-8 uppercase italic">
            NO SHORTCUTS • JUST RESULTS • IRON THERAPY • GRIND DONT STOP •{" "}
          </span>
          <span className="text-4xl md:text-6xl font-black text-black px-8 uppercase italic">
            NO SHORTCUTS • JUST RESULTS • IRON THERAPY • GRIND DONT STOP •{" "}
          </span>
          <span className="text-4xl md:text-6xl font-black text-black px-8 uppercase italic">
            NO SHORTCUTS • JUST RESULTS • IRON THERAPY • GRIND DONT STOP •{" "}
          </span>
        </div>
      </div>

      {/* --- WHY CHOOSE US (FEATURES) --- */}
      <section className="features-section py-24 px-6 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-7xl font-black uppercase text-white">
              Why <span className="text-zinc-600">Us?</span>
            </h2>
            <p className="text-gray-400 max-w-md text-right mt-4 md:mt-0">
              We don't just sell memberships. We sell a lifestyle change.
              Experience the best ambience in West Bengal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Facilities",
                desc: "Well-equipped gym with high-quality biomechanical machines and a motivating atmosphere.",
                icon: "🏋️‍♂️",
              },
              {
                title: "Expert Guidance",
                desc: "Two certified trainers always on the floor to guide your form and push your limits.",
                icon: "🧠",
              },
              {
                title: "Comfort & Privacy",
                desc: "Separate changing rooms & washrooms for men and women. Open shelf storage for your gear.",
                icon: "✨",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="feature-card group p-8 bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 text-6xl transition-opacity grayscale group-hover:grayscale-0">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 text-white group-hover:text-red-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
                <div className="w-12 h-1 bg-zinc-700 mt-6 group-hover:w-full group-hover:bg-red-600 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING PLANS --- */}
      <section className="plans-section py-24 px-6 bg-black relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 text-white">
            <span className="text-red-600">Invest</span> In Yourself
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Monthly */}
            <div className="plan-card p-8 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300 flex flex-col">
              <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">
                Starter
              </h3>
              <div className="text-4xl font-black text-white mb-2">
                ₹600
                <span className="text-lg font-medium text-gray-500">/mo</span>
              </div>
              <p className="text-red-500 text-xs font-bold uppercase mb-6 tracking-wider">
                + ₹1000 Admission Fee
              </p>

              <ul className="space-y-4 text-gray-300 text-sm mb-8 flex-1">
                <li className="flex items-center gap-2">✓ Full Gym Access</li>
                <li className="flex items-center gap-2">
                  ✓ Floor Trainer Guidance
                </li>
                <li className="flex items-center gap-2">✓ Shelf Storage</li>
              </ul>
              <button
                onClick={scrollToForm}
                className="w-full py-3 border border-white text-white font-bold uppercase hover:bg-white hover:text-black transition-colors"
              >
                Select Plan
              </button>
            </div>

            {/* Yearly (Best Value) */}
            <div className="plan-card p-8 border-2 border-red-600 bg-zinc-900 relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(220,38,38,0.3)] flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider">
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
                <li className="flex items-center gap-2 text-white">
                  ✓ <span className="font-bold">12 Months Access</span>
                </li>
                <li className="flex items-center gap-2">
                  ✓ Zero Admission Charges
                </li>
                <li className="flex items-center gap-2">
                  ✓ Floor Trainer Guidance
                </li>
                <li className="flex items-center gap-2">
                  ✓ Full Facility Access
                </li>
              </ul>
              <button
                onClick={scrollToForm}
                className="w-full py-4 bg-red-600 text-white font-black uppercase hover:bg-red-700 transition-colors shadow-lg"
              >
                Select Plan
              </button>
            </div>

            {/* Half Yearly */}
            <div className="plan-card p-8 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300 flex flex-col">
              <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">
                Steady
              </h3>
              <div className="text-4xl font-black text-white mb-2">₹3000</div>
              <p className="text-green-500 text-xs font-bold uppercase mb-6 tracking-wider">
                NO ADMISSION FEE
              </p>

              <ul className="space-y-4 text-gray-300 text-sm mb-8 flex-1">
                <li className="flex items-center gap-2">✓ 6 Months Access</li>
                <li className="flex items-center gap-2">
                  ✓ Zero Admission Charges
                </li>
                <li className="flex items-center gap-2">
                  ✓ Floor Trainer Guidance
                </li>
              </ul>
              <button
                onClick={scrollToForm}
                className="w-full py-3 border border-white text-white font-bold uppercase hover:bg-white hover:text-black transition-colors"
              >
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- LEAD GENERATION FORM --- */}
      <section
        ref={formRef}
        className="py-24 px-4 bg-gradient-to-t from-red-900/20 to-black relative"
      >
        <div className="max-w-xl mx-auto bg-zinc-950 p-8 md:p-12 border border-zinc-800 shadow-2xl rounded-2xl relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/30 blur-[80px] rounded-full pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-black text-center mb-2 text-white italic uppercase">
            Start Now
          </h2>
          <p className="text-center text-gray-500 mb-10 text-sm uppercase tracking-widest">
            Your future self will thank you
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="group relative">
              <input
                name="name"
                placeholder="FULL NAME"
                onChange={handleChange}
                value={formData.name}
                className="w-full bg-black/50 border border-zinc-800 p-4 text-white focus:border-red-600 outline-none transition-all rounded text-sm font-bold tracking-wider placeholder-zinc-600 focus:bg-zinc-900"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                name="phone"
                placeholder="PHONE NUMBER"
                onChange={handleChange}
                value={formData.phone}
                className="w-full bg-black/50 border border-zinc-800 p-4 text-white focus:border-red-600 outline-none transition-all rounded text-sm font-bold tracking-wider placeholder-zinc-600 focus:bg-zinc-900"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="EMAIL"
                onChange={handleChange}
                value={formData.email}
                className="w-full bg-black/50 border border-zinc-800 p-4 text-white focus:border-red-600 outline-none transition-all rounded text-sm font-bold tracking-wider placeholder-zinc-600 focus:bg-zinc-900"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <input
                name="age"
                type="number"
                placeholder="AGE"
                onChange={handleChange}
                value={formData.age}
                className="w-full bg-black/50 border border-zinc-800 p-4 text-white focus:border-red-600 outline-none transition-all rounded text-sm font-bold tracking-wider placeholder-zinc-600 focus:bg-zinc-900"
                required
              />
              <input
                name="weight"
                type="number"
                placeholder="WGT (KG)"
                onChange={handleChange}
                value={formData.weight}
                className="w-full bg-black/50 border border-zinc-800 p-4 text-white focus:border-red-600 outline-none transition-all rounded text-sm font-bold tracking-wider placeholder-zinc-600 focus:bg-zinc-900"
                required
              />
              <input
                name="height"
                type="number"
                placeholder="HGT (CM)"
                onChange={handleChange}
                value={formData.height}
                className="w-full bg-black/50 border border-zinc-800 p-4 text-white focus:border-red-600 outline-none transition-all rounded text-sm font-bold tracking-wider placeholder-zinc-600 focus:bg-zinc-900"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-black py-5 hover:bg-red-600 hover:text-white transition-all duration-300 uppercase tracking-[0.2em] rounded text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
            >
              Submit Request
            </button>
          </form>
        </div>
      </section>
      {/* --- GALLERY PREVIEW --- */}
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
            {recentPhotos.map((photo, i) => (
              <div
                key={photo._id}
                className={`relative overflow-hidden rounded-lg group ${i === 0 ? "col-span-2 row-span-2" : "col-span-1 h-40 md:h-auto"}`}
              >
                <img
                  src={photo.photoUrl}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  alt="Gym"
                />
              </div>
            ))}
          </div>
          {recentPhotos.length === 0 && (
            <p className="text-gray-600 text-sm">No photos yet.</p>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 bg-black text-center border-t border-zinc-900">
        <p className="text-zinc-600 text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {GYM_NAME} {GYM_SUB}. Midnapore,
          West Bengal.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
