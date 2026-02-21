/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          primary: '#5E6F52',
          light: '#7F8F70',
        },
        beige: {
          background: '#F3EFE6',
          accent: '#E6D8C3',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        menu: ['HelveticaNeueCyr', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['HelveticaNeueCyr', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['HelveticaNeueCyr', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50% - var(--gap)))' },
        },
      },
    },
  },
  plugins: [],
}
