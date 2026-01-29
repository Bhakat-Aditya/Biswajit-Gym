import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { FaTimes, FaBolt, FaStar, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const container = useRef();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    height: "",
    weight: "",
  });

  // GSAP Animations
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".hero-word", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      })
        .from(
          ".hero-sub",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".mobile-cta",
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );
    },
    { scope: container },
  );

  // 1. UPDATED HANDLE CHANGE (Prevents letters)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field being typed in is 'phone' or 'age' or 'weight'/'height'
    if (name === "phone") {
      // RegEx to remove anything that is NOT a number
      const numericValue = value.replace(/\D/g, "");

      // Limit to 10 digits max
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      // Normal behavior for text fields like Name/Email
      setFormData({ ...formData, [name]: value });
    }
  };

  // 2. UPDATED SUBMIT (Checks for 10 digits)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation Check
    if (formData.phone.length !== 10) {
      alert("⚠️ Invalid Phone Number! Please enter exactly 10 digits.");
      return; // Stop the function here
    }

    try {
      await axios.post(`${API_URL}/api/register-lead`, formData);
      alert("YOU ARE IN! We will contact you shortly.");
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        height: "",
        weight: "",
      });
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    }
  };
  return (
    <div
      ref={container}
      className="min-h-dvh bg-gymDark text-white font-sans overflow-x-hidden relative selection:bg-gymRed selection:text-white"
    >
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-gymDark via-gymDark/70 to-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
          alt="Gym Background"
          className="w-full h-full object-cover object-center opacity-60"
        />
      </div>

      {/* --- NAVBAR (Updated) --- */}
      <nav className="relative z-20 flex justify-between items-center px-6 py-5 md:px-12">
        <h1
          className="text-2xl md:text-3xl font-black italic tracking-tighter cursor-pointer"
          onClick={() => navigate(0)}
        >
          IRON<span className="text-gymRed">FIT</span>
        </h1>

        <div className="flex items-center gap-4">
          {/* ALWAYS VISIBLE ADMIN BUTTON */}
          <button
            onClick={() => navigate("/admin")}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-white/20 transition-all"
          >
            <FaLock className="text-gymRed" /> ADMIN
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="hidden md:block border border-gymRed text-gymRed px-6 py-2 rounded-full text-sm font-bold hover:bg-gymRed hover:text-white transition-all duration-300"
          >
            BECOME A MEMBER
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-end pb-12 md:justify-center min-h-dvh px-6">
        {/* Floating Badge */}
        <div className="hero-sub self-start mb-4 flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="text-[10px] md:text-sm font-bold tracking-widest uppercase text-gray-300">
            #1 Rated in Midnapore
          </span>
        </div>

        {/* Massive Stacked Typography */}
        <div className="flex flex-col leading-[0.9]">
          <h1 className="hero-word text-6xl md:text-9xl font-black tracking-tighter text-white">
            BUILD
          </h1>
          <h1 className="hero-word text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            YOUR
          </h1>
          <h1 className="hero-word text-6xl md:text-9xl font-black tracking-tighter text-gymRed drop-shadow-lg">
            LEGACY
          </h1>
        </div>

        <p className="hero-sub mt-6 text-gray-300 text-sm md:text-xl font-medium max-w-md leading-relaxed">
          The most advanced equipment in West Bengal.{" "}
          <br className="hidden md:block" />
          Join 150+ members transforming their lives today.
        </p>

        {/* MOBILE PRIMARY ACTION */}
        <div className="mobile-cta mt-8 w-full md:max-w-md">
          <button
            onClick={() => setShowModal(true)}
            className="w-full group relative overflow-hidden bg-gymRed text-white font-black text-lg py-5 rounded-2xl shadow-xl shadow-gymRed/20 active:scale-95 transition-all duration-200"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              START YOUR JOURNEY <FaBolt />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <p className="hero-sub text-center mt-3 text-[10px] text-gray-500 uppercase tracking-widest">
            Limited slots available for this month
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full md:max-w-md bg-[#121212] rounded-t-3xl md:rounded-3xl p-8 shadow-2xl border-t border-white/10 animate-slide-up">
            <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-6 md:hidden" />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors hidden md:block"
            >
              <FaTimes size={20} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-black italic uppercase text-white">
                Access Pass
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Enter your details to register as a lead.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1F1F1F] text-white p-4 rounded-xl border border-transparent focus:border-gymRed focus:outline-none placeholder-gray-600 font-medium text-sm transition-colors"
                  placeholder="Full Name"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone} // <--- ADD THIS LINE
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1F1F1F] text-white p-4 rounded-xl border border-transparent focus:border-gymRed focus:outline-none placeholder-gray-600 font-medium text-sm"
                    placeholder="Phone (10 digits)"
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1F1F1F] text-white p-4 rounded-xl border border-transparent focus:border-gymRed focus:outline-none placeholder-gray-600 font-medium text-sm"
                    placeholder="Email"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    name="age"
                    onChange={handleChange}
                    className="bg-[#1F1F1F] text-white p-3 rounded-xl focus:border-gymRed focus:outline-none text-center text-sm"
                    placeholder="Age"
                  />
                  <input
                    type="text"
                    name="height"
                    onChange={handleChange}
                    className="bg-[#1F1F1F] text-white p-3 rounded-xl focus:border-gymRed focus:outline-none text-center text-sm"
                    placeholder="Ht (cm)"
                  />
                  <input
                    type="text"
                    name="weight"
                    onChange={handleChange}
                    className="bg-[#1F1F1F] text-white p-3 rounded-xl focus:border-gymRed focus:outline-none text-center text-sm"
                    placeholder="Wt (kg)"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-gymRed text-white font-black uppercase py-4 rounded-xl active:scale-95 transition-all shadow-lg shadow-gymRed/20"
              >
                Submit Details
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
