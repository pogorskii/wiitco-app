import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: `url('/test-bg.webp'),
          linear-gradient(114.86deg, #2D0936 14.71%, #170312 78.23%)
        `,
      },
    },
  },
  plugins: [],
};
export default config;
