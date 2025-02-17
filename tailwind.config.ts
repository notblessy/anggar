import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: {
          white: "hsl(var(--background-white))",
          lightest: "hsl(var(--background-lightest))",
          lighter: "hsl(var(--background-lighter))",
          DEFAULT: "hsl(var(--background))",
          darker: "hsl(var(--background-darker))",
          darkest: "hsl(var(--background-darkest))",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          lightest: "hsl(var(--card-lightest))",
          lighter: "hsl(var(--card-lighter))",
          DEFAULT: "hsl(var(--card))",
          darker: "hsl(var(--card-darker))",
          darkest: "hsl(var(--card-darkest))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          lightest: "hsl(var(--popover-lightest))",
          lighter: "hsl(var(--popover-lighter))",
          DEFAULT: "hsl(var(--popover))",
          darker: "hsl(var(--popover-darker))",
          darkest: "hsl(var(--popover-darkest))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          lightest: "hsl(var(--primary-lightest))",
          lighter: "hsl(var(--primary-lighter))",
          DEFAULT: "hsl(var(--primary))",
          darker: "hsl(var(--primary-darker))",
          darkest: "hsl(var(--primary-darkest))",
        },
        secondary: {
          lightest: "hsl(var(--secondary-lightest))",
          lighter: "hsl(var(--secondary-lighter))",
          DEFAULT: "hsl(var(--secondary))",
          darker: "hsl(var(--secondary-darker))",
          darkest: "hsl(var(--secondary-darkest))",
        },
        tertiary: {
          lightest: "hsl(var(--tertiary-lightest))",
          lighter: "hsl(var(--tertiary-lighter))",
          DEFAULT: "hsl(var(--tertiary))",
          darker: "hsl(var(--tertiary-darker))",
          darkest: "hsl(var(--tertiary-darkest))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        accent: {
          lightest: "hsl(var(--accent-lightest))",
          lighter: "hsl(var(--accent-lighter))",
          DEFAULT: "hsl(var(--accent))",
          darker: "hsl(var(--accent-darker))",
          darkest: "hsl(var(--accent-darkest))",
          foreground: "hsl(var(--accent-foreground))",
        },
        contrast: "hsl(var(--contrast))",
        highlight: "hsl(var(--highlight))",
        subtle: "hsl(var(--subtle))",
        elevated: "hsl(var(--elevated))",
        destructive: "hsl(var(--destructive))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        shadow: "hsl(var(--shadow))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
