import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ["light"],
        prefix: "daisy-",
    },
    plugins: [
        require("daisyui"),
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".style-underline": {
                    borderBottomWidth: "0",
                    backgroundImage: "linear-gradient(transparent, transparent), linear-gradient(#fff, #fff)",
                    backgroundSize: "0 3px",
                    backgroundPosition: "0 100%",
                    backgroundRepeat: "no-repeat",
                },

                ".style-bg-underline": {
                    backgroundImage: "linear-gradient(transparent, transparent), linear-gradient(rgb(255, 34, 34), rgb(255, 34, 104))",
                },

                ".animate-underline": {
                    backgroundSize: "100% 3px",
                    backgroundPosition: "0 100%",
                },
            });
        }),
    ],
};

export default config;
