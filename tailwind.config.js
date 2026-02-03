/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0066CC",
        accent: "#5E5CE6",
        background: "#F5F5F7",
        surface: "#FFFFFF",
        "text-main": "#1D1D1F",
        "text-sub": "#86868B",
        glass: "rgba(255,255,255,0.85)",
      },
      fontSize: {
        "display": ["32px", { lineHeight: "1.2", letterSpacing: "-0.5px", fontWeight: "700" }],
        "section": ["22px", { lineHeight: "1.3", letterSpacing: "-0.3px", fontWeight: "600" }],
        "body": ["17px", { lineHeight: "24px", fontWeight: "400" }],
        "mono": ["14px", { lineHeight: "20px", fontWeight: "400" }],
      },
      borderRadius: {
        "3xl": "24px",
      },
      boxShadow: {
        "glass": "0 4px 24px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
