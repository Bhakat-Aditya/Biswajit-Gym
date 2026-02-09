import React, { useState } from "react";

const BMICalculator = ({ isOpen, onClose }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight && height) {
      // BMI Formula: weight (kg) / [height (m)]^2
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      if (bmiValue < 18.5) setMessage("Underweight (Time to Bulk!)");
      else if (bmiValue >= 18.5 && bmiValue < 24.9)
        setMessage("Normal Weight (Maintain!)");
      else if (bmiValue >= 25 && bmiValue < 29.9)
        setMessage("Overweight (Let's Cut!)");
      else setMessage("Obese (Join Us Now!)");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-2xl w-full max-w-sm relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black text-white uppercase italic mb-6 text-center">
          BMI <span className="text-red-600">Check</span>
        </h2>

        <form onSubmit={calculateBMI} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">
              WEIGHT (KG)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 text-white rounded focus:border-red-600 outline-none font-bold"
              placeholder="e.g. 75"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">
              HEIGHT (CM)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 text-white rounded focus:border-red-600 outline-none font-bold"
              placeholder="e.g. 175"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded uppercase tracking-wider transition-colors"
          >
            Calculate
          </button>
        </form>

        {bmi && (
          <div className="mt-6 text-center bg-black/50 p-4 rounded border border-zinc-800">
            <p className="text-gray-400 text-xs uppercase mb-1">Your BMI Is</p>
            <p className="text-4xl font-black text-white mb-2">{bmi}</p>
            <p
              className={`text-sm font-bold uppercase tracking-wide ${bmi < 18.5 || bmi > 25 ? "text-red-500" : "text-green-500"}`}
            >
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
