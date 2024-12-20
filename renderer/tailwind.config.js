import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './renderer/app/**/*.{ts,tsx}',
    './renderer/components/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        title: "#232329",
        body: "#545c66",
        brandGreen: "#00473E",
        gray: {
          900: "#420505",
          800: "#761212",
          700: "#c61f1e",
          600: "#e02423",
          500: "#ea3639",
          400: "#ff4747",
          300: "#ff7271",
          200: "#ffa4a3",
          100: "#ffcccb",
          50: "#fee",
          25: "#fff7f7",
        },
        brand: {
          900: "#15044c",
          800: "#220876",
          700: "#3818a1",
          500: "#522bd6",
          400: "#6841ea",
          300: "#9373ff",
          200: "#b8a3fb",
          100: "#dfd5fe",
          50: "#f0ebff",
          25: "#fcfbfe",
        },
        brand2: {
          50: "#fcf8d8",
          400: "#dcf458"
        },
        grayblue: {
          900: "#191e24",
          800: "#20262e",
          700: "#3c434d",
          600: "#545c66",
          500: "#858e99",
          400: "#c0c5cc",
          300: "#dadee3",
          200: "#ebeef2",
          100: "#f4f6f8",
          50: "#f9fafb",
          8: "#eff0f1",
        },
        gray: {
          50: "#fafafa",
          75: "#f7f7f7",
          100: "#f5f5f5",
          200: "#f4f6f8",
          300: "#dbdbdb",
          400: "#c2c2c2",
          500: "#8c8c8c",
          600: "#595959",
          800: "#242424",
          900: "#1a1a1a",
        },
        purple: {
          50: "#fcf2fd",
          400: "#a55bf6",
          200: "#deb3fb",
          100: "#f0d5fe",
          500: "#c37ff1",
        },
        primaryblue: {
          25: "#fafcff",
          50: "#edf3ff",
          30: "#5d98ff",
          300: "#5d98ff",
          400: "#1e6fff",
          500: "#185ceb",
        },
        yellow: {
          50: "#fdfae9",
          300: "#ffcd00",
          400: "#ffab00",
        },
        newgray: {
          lv1: "#f5f5f5",
          lv2: "#fff",
          lv3: "#f9fafb",
          lv4: "#fafafa",
          nav: "#ececee",
          color1: "#ffffff",
          300: "#f7f7f7",
          color3: "#ffffff",
          color4: "rgba(255, 255, 255, .8)",
          color5: "#f0f0f0",
        },
        boxShadow: {
          s0: "0px 4px 24px 0px rgba(145,158,171,.14),0px 0px 2px 0px rgba(145,158,171,.2)",
          s1: "0px 1px 20px 0px rgba(0,0,0,.04)",
          s2: "0px 8px 40px 0px rgba(0,0,0,.08),0px 0px 1px 0px rgba(0,0,0,.08)",
          s3: "0px 12px 40px -4px rgba(0,0,0,.14),0px 0px 2px 0px rgba(0,0,0,.08)",
          s4: "0px 4px 24px 0px rgba(145,158,171,.14),0px 0px 2px 0px rgba(145,158,171,.2)",
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')]
}
