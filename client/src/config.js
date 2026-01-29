// client/src/config.js

// If we are in production (Vercel), use the environment variable.
// If we are in development (Local), use localhost:5000.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default API_URL;