/** @type {import('tailwindcss').Config} */
export default {
    darkMode: false,
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Paleta inspirada en un diseño limpio/corporativo
                primary: {
                    light: '#3b82f6', // Azul claro para hover/estados
                    DEFAULT: '#2563eb', // Azul principal
                    dark: '#1d4ed8' // Azul oscuro para active/foco
                },
                secondary: {
                    light: '#f3f4f6',
                    DEFAULT: '#e5e7eb',
                    dark: '#d1d5db'
                },
                background: '#ffffff', // Fondo blanco
                surface: '#ffffff', // Superficie de los cards/contenedores
                text: {
                    primary: '#1f2937', // Gris muy oscuro para texto principal
                    secondary: '#6b7280', // Gris medio para texto secundario
                    accent: '#2563eb' // Color de acento para enlaces
                },
                border: '#e5e7eb' // Color de borde sutil
            },
            fontFamily: {
                // Opcional: Definir una fuente más limpia si se instala
                // sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'subtle': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
                'medium': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
}