const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      textShadow: {
        purple:
          "-1px -1px 0 #7555DA, 1px -1px 0 #7555DA, -1px 1px 0 #7555DA, 1px 1px 0 #7555DA",
        white:
          "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
      },
      colors: {
        "seeds-purple": "#7555DA",
        "seeds-purple-2": "#9A76FE",
        "seeds-green": "#4FE6AF",
        "seeds-button-green": "#3AC4A0",
        "seeds-green-2": "#DCFCE4",
        "neutral-medium": "#262626",
        "neutral-soft": "#7C7C7C",
        "neutral-ultrasoft": "#CCCCCC",
        "warning-hard": "#DD2525",
        "seeds-battle-1": "#66e1b7",
        "seeds-battle-2": "#5987ca",
      },
      backgroundImage: {
        hello: "url('../src/assets/hello.png')",
        "ellipse-purple": "url('../src/assets/ellipse-purple.png')",
        "quiz-gradient": "linear-gradient(88deg, #10A8AD 0%, #79F0B8 137.56%)",
        slashedBanner:
          "url('/src/assets/play/tournament/bannerLeaderboard.png')",
        userInfoBackground: "url('../assets/userInfoBackground.svg')",
        "gradient-radial-subs":
          "radial-gradient(ellipse at center, #EED69C, #FABE2C)",
      },
      backgroundSize: {
        "50%": "50%",
        "60%": "60%",
        "70%": "70%",
        "80%": "80%",
        "90%": "90%",
        "100%": "100%",
        "120%": "120%",
        "140%": "140%",
        "160%": "160%",
        "180%": "180%",
      },
      rotate: {
        270: "270deg",
      },
      boxShadow: {
        center: "0 0px 1px 1px rgba(0, 0, 0, 0.05)",
        "subs-complete": `
          inset 0 8px 24px 16px #FFFFFF3e, 
          inset 0 -24px 32px 0 #FFFFFF3e, 
          inset 0 0 12px 0 #FFFFFF, 
          0 6px 15px rgba(250, 190, 44, 0.5), 
          0 2px 20px rgba(238, 214, 156, 0.5)
        `,
        "subs-complete-hover": `
          inset 0 8px 24px 16px #FFFFFF3e, 
          inset 0 -24px 32px 0 #FFFFFF3e, 
          inset 0 0 12px 0 #FFFFFF, 
          0 8px 18px rgba(250, 190, 44, 0.6), 
          0 4px 25px rgba(238, 214, 156, 0.6)
        `,
      },
      animation: {
        "slide-down": "slide-down 300ms ease-out forwards",
        "slide-up": "slide-up 300ms ease-out forwards",
        "fade-in-slide": "fade-in-slide 1000ms ease-out forwards",
        "fade-out-slide": "fade-out-slide 1000ms ease-out forwards",
        "fade-in": "fade-in 300ms ease-out forwards",
        spinner: "spinner 800ms ease-in-out infinite",
        "bounce-horizontal": "bounce-horizontal 2000ms infinite",
        "bounce-reverse": "bounce-reverse 2000ms infinite",
        "shadow-move": "shadow-move 3s infinite",
        "shadow-voicenotes": "shadow-voicenotes 1s infinite",
      },
      keyframes: {
        "slide-down": {
          from: {
            opacity: 0,
            transform: "translateY(-3rem)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          from: {
            opacity: 1,
            transform: "translateY(0)",
          },
          to: {
            opacity: 0,
            transform: "translateY(-3rem)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        spinner: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "fade-in-slide": {
          from: {
            opacity: 0,
            transform: "translateY(100px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-out-slide": {
          from: {
            opacity: 1,
            transform: "translateY(0)",
          },
          to: {
            opacity: 0,
            transform: "translateY(100px)",
          },
        },
        "bounce-horizontal": {
          "0%": {
            transform: "translateX(-25%)",
            "animation-timing-function": "cubic - bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic - bezier(0, 0, 0.2, 1)",
          },
          "100%": {
            transform: "translateX(-25%)",
            "animation-timing-function": "cubic - bezier(0.8, 0, 1, 1)",
          },
        },
        "bounce-reverse": {
          "0%": {
            transform: "translateX(25%)",
            "animation-timing-function": "cubic - bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic - bezier(0, 0, 0.2, 1)",
          },
          "100%": {
            transform: "translateX(25%)",
            "animation-timing-function": "cubic - bezier(0.8, 0, 1, 1)",
          },
        },
        "shadow-move": {
          "0%, 100%": { boxShadow: "0 0 15px 5px rgba(255, 255, 255, 1)" },
          "50%": { boxShadow: "0 0 30px 10px rgba(58, 196,160, 0.9)" },
        },
        "shadow-voicenotes": {
          "0%, 100%": { boxShadow: "0 0 8px 1px rgba(255, 255, 255, 1)" },
          "50%": { boxShadow: "0 0 15px 5px rgba(220, 252, 228, 1)" },
        },
      },
    },
  },
  plugins: [],
});
