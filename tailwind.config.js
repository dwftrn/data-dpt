/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'merriweather-sans': ['Merriweather Sans', 'sans']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        'primary-blue-700': 'hsl(var(--primary-blue-700))',
        'primary-blue-300': 'hsl(var(--primary-blue-300))',
        'primary-blue-50': 'hsl(var(--primary-blue-50))',
        'primary-red-500': 'hsl(var(--primary-red-500))',
        'primary-red-700': 'hsl(var(--primary-red-700))',
        'dark-700': 'hsl(var(--dark-700))',
        'dark-300': 'hsl(var(--dark-300))',
        'grey-700': 'hsl(var(--grey-700))',
        'grey-500': 'hsl(var(--grey-500))',
        'grey-50': 'hsl(var(--grey-50))',
        'success-700': 'hsl(var(--success-700))',
        'special-link': 'hsl(var(--special-link))',
        'special-orange': 'hsl(var(--special-orange))',
        'error-50': 'hsl(var(--error-50))',
        'light-green': 'hsl(var(--light-green))',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      },
      boxShadow: {
        custom: '0px 2px 4px 0px hsla(0, 0%, 0%, 0.25)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
