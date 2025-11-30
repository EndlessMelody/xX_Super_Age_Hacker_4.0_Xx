/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                rainbow: 'rainbow 2s linear infinite',
                shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
                blink: 'blink 1s step-end infinite',
            },
            keyframes: {
                rainbow: {
                    '0%': { backgroundColor: '#ff0000' },
                    '20%': { backgroundColor: '#ffff00' },
                    '40%': { backgroundColor: '#00ff00' },
                    '60%': { backgroundColor: '#00ffff' },
                    '80%': { backgroundColor: '#ff00ff' },
                    '100%': { backgroundColor: '#ff0000' },
                },
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                }
            }
        },
    },
    plugins: [],
}
