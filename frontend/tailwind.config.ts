import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [{pattern: /text-[0-9]+/}],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        8: "0.5rem",
        10: "0.625rem",
        12: "0.75rem",
        14: "0.875rem",
        16: "1rem",
        18: "1.125rem",
        20: "1.25rem",
        24: "1.5rem",
        30: "1.875rem",
        36: "2.25rem",
        48: "3rem",
        60: "3.75rem",
        72: "4.5rem",
      }
    },
  },
  plugins: [],
} satisfies Config;
