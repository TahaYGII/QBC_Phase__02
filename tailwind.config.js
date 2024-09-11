/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.{html,js}"],
    darkMode: "class",
    theme: {
        extend: {
                boxShadow: {
        'custom': '0px 4px 58px 0px rgba(0, 0, 0, 0.06)',
      }
        },
    },
    plugins: [
        // require('daisyui'),
    ],
}

