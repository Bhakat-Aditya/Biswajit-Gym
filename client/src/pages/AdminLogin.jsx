import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  // FIXED: The variable name matches the logic now
  const SECRET_CODE = "admin123";

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents page reload
    // FIXED: Matched the variable name here
    if (pass === SECRET_CODE) {
      sessionStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Access Denied");
    }
  };

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-sm px-4"
      >
        <h1 className="text-white text-2xl font-bold text-center">
          Owner Access
        </h1>
        <input
          type="password"
          placeholder="Enter Passcode"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          // FIXED: Adds standard autocomplete behavior
          autoComplete="current-password"
          className="p-3 bg-zinc-900 text-white border border-zinc-700 outline-none focus:border-red-600 transition-colors rounded"
          autoFocus
        />
        {/* FIXED: type="submit" enables the Enter key */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white py-3 font-bold rounded transition-colors"
        >
          ENTER DASHBOARD
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
