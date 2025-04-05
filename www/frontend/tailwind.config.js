/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        's370': '370px', 
        's450': '450px', 
        's400': '400px', 
        's500': '500px', 
        's540': '540px', 
        'sm': '640px',   
        'sm670': '670px',   
        'md': '770px',
        's820': '820px',
        's900': '900px',
        's950': '950px',
        's1050': '1050px',
        's1000': '1000px',
        's1100': '1100px',
        's1150': '1150px',
        's1200': '1150px',
        'lg': '1024px', 
        'xl': '1280px', 
        's1450': '1450px',
        '2xl': '1536px',
        's1900': '1900px',
        's2000': '2000px',
        's2500': '2500px',
        's3000': '3000px',
        's3500': '3500px',
        's4000': '4000px',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'scale-up': 'scaleUp 1s ease-out',
        bounce: 'bounce 2s infinite', // Adding custom animation class

      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }, // How high the button bounces
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      
      colors: {
        'primary': '#e2c765',
        'white': '#ffffff', // Default white (optional)
        'charcoal-gray': '#2e2e2e',
        'button-cta': '#c7a647',
        'link-icons': '#6574e2',
      },
      fontFamily: {
        sans: ["Lato", "serif"],
        lyon: ["Lyon Display","Lyon Text Web","Times New Roman","Georgia","serif","system-ui"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}