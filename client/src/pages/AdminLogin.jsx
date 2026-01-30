import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  // HARDCODED SECURITY (As requested)
  // In production, keep this string complicated.
  const SECRET_CODE = "MidnaporeGym2024!";

  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === XH_CODE) {
      // Simple session storage to persist login during refresh
      sessionStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Access Denied");
    }
  };

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <h1 className="text-white text-2xl font-bold">Owner Access</h1>
        <input
          type="password"
          placeholder="Enter Passcode"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="p-3 bg-zinc-900 text-white border border-zinc-700 outline-none focus:border-red-600"
        />
        <button className="bg-red-600 text-white py-2 font-bold">ENTER</button>
      </form>
    </div>
  );
};

export default AdminLogin;
