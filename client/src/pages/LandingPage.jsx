import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    weight: "",
    XH: "",
  });

  useEffect(() => {
    // Hero Animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" },
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual backend URL
      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/leads`,
        formData,
      );
      alert("Welcome to the Tribe! We'll call you shortly.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        age: "",
        weight: "",
        height: "",
      });
    } catch (err) {
      alert("Something went wrong. Try again.");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden font-sans selection:bg-red-600 selection:text-white">
      {/* Navbar with Admin Button */}
      <nav className="fixed w-full z-50 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/10">
        <h1 className="text-2xl font-black italic tracking-tighter text-red-600">
          IRON FORGE
        </h1>
        <button
          onClick={() => navigate("/admin-login")}
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          OWNER
        </button>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center relative px-4 text-center">
        <div ref={heroRef} className="z-10">
          <h1 className="text-6xl md:text-9xl font-black uppercase leading-none mb-4">
            Build <span className="text-red-600">Your</span> <br /> Legacy
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Midnapore's Premier Fitness Destination. Pain is temporary. Glory is
            forever.
          </p>
          <button
            onClick={() =>
              formRef.current.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-xl font-bold uppercase tracking-widest transition-all transform hover:scale-105"
          >
            Become a Member
          </button>
        </div>
        {/* Background Overlay or Video could go here */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none"></div>
      </section>

      {/* Lead Generation Form Section */}
      <section
        ref={formRef}
        className="py-20 px-4 bg-zinc-900 border-t border-white/10"
      >
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 text-red-500 italic">
            START NOW
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              className="w-full bg-black border border-zinc-700 p-4 text-white focus:border-red-600 outline-none transition-colors"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={formData.email}
              className="w-full bg-black border border-zinc-700 p-4 text-white focus:border-red-600 outline-none transition-colors"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                value={formData.phone}
                className="w-full bg-black border border-zinc-700 p-4 text-white focus:border-red-600 outline-none transition-colors"
                required
              />
              <input
                name="age"
                type="number"
                placeholder="Age"
                onChange={handleChange}
                value={formData.age}
                className="w-full bg-black border border-zinc-700 p-4 text-white focus:border-red-600 outline-none transition-colors"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="weight"
                type="number"
                placeholder="Weight (kg)"
                onChange={handleChange}
                value={formData.weight}
                className="w-full bg-black border border-zinc-700 p-4 text-white focus:border-red-600 outline-none transition-colors"
                required
              />
              <input
                name="height"
                type="number"
                placeholder="Height (cm)"
                onChange={handleChange}
                value={formData.height}
                className="w-full bg-black border border-zinc-700 p-4 text-white focus:border-red-600 outline-none transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-black py-4 hover:bg-gray-200 transition-colors uppercase"
            >
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
