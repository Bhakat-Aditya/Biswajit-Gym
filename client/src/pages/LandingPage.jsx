import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// COMPONENTS
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Features from "../components/Features";
import Trainers from "../components/Trainers";
import Testimonials from "../components/Testimonials"; // <--- NEW
import Pricing from "../components/Pricing";
import GalleryPreview from "../components/GalleryPreview";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import BMICalculator from "../components/BMICalculator";

gsap.registerPlugin(ScrollTrigger);

// --- LOAD LOCAL IMAGES ---
const localImages = import.meta.glob(
  "../assets/gallery/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);
const galleryArray = Object.values(localImages);

const LandingPage = () => {
  const mainRef = useRef(null);
  const [isBmiOpen, setIsBmiOpen] = useState(false);

  // Take the first 4 images for the preview
  const recentPhotos = galleryArray.slice(0, 4);

  // --- ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee
      gsap.to(".marquee-track-left", {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1,
      });
      gsap.fromTo(
        ".marquee-track-right",
        { xPercent: -50 },
        { xPercent: 0, ease: "none", duration: 15, repeat: -1 },
      );

      // Hero
      gsap.from(".hero-content", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      });

      // Features
      gsap.from(".feature-card", {
        scrollTrigger: { trigger: ".features-section", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });

      // Plans
      gsap.from(".plan-card", {
        scrollTrigger: { trigger: ".plans-section", start: "top 75%" },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const scrollToPlans = () => {
    const plansSection = document.querySelector(".plans-section");
    if (plansSection) plansSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={mainRef}
      className="bg-black text-white min-h-screen overflow-x-hidden font-sans selection:bg-red-600 selection:text-white"
    >
      <Navbar onOpenBmi={() => setIsBmiOpen(true)} />

      <Hero />
      <Marquee />
      <Features />

      <Trainers />

      {/* NEW: Testimonials Section */}
      <Testimonials />

      <Pricing />
      <GalleryPreview recentPhotos={recentPhotos} />
      <FAQ />
      <Footer scrollToPlans={scrollToPlans} />

      <BMICalculator isOpen={isBmiOpen} onClose={() => setIsBmiOpen(false)} />
    </div>
  );
};

export default LandingPage;
