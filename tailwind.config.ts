import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'fis-blue': 'rgb(var(--blue))',
        'fis-teal': 'rgb(var(--teal))',
        'fis-purple': 'rgb(var(--purple))',
      },
      fontFamily: {
        sans: 'Lato',
      },
    },
  },
  plugins: [],
};

export default config;
