import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                poppins: 'poppins'
            },
            colors: {
                default: '#747474',
                primary: '#DB4B4B'
            },
            borderColor: {
                gray: '#CBCBCB'
            },
            backgroundImage: {
                'login-bg': "url('/assets/images/image-painel.svg')",
                'custom-gradient': 'linear-gradient(to right, #db4b4b, #de4141, #d72626)'
            },
            boxShadow: {
                default: '0 2px 2px rgba(0, 0, 0, 0.3)'
            },
    }},

    plugins: [forms],
};
