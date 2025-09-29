/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00BFFF",
        accent: "#FF8C00",
        bgdeep: "#0F0F10",
        panel: "#1E1F22"
      },
      boxShadow: {
        neon: "0 0 20px rgba(0,191,255,0.6)"
      }
    },
  },
  plugins: [],
}
