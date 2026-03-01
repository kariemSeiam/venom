const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    'group-hover:shadow',
    'group-hover:opacity-20',
    '-left-[0.125rem]',
    '-bottom-[0.125rem]',
  ],
  content: [
    './extensions/antigravity/src/panel/chat/**/*.(js|jsx|ts|tsx)',
    '../exa/chat_client/src/**/*.(js|jsx|ts|tsx)',
    '../exa/design_system/src/**/*.(js|jsx|ts|tsx)',
    '../exa/agent_ui_toolkit/src/**/*.(js|jsx|ts|tsx)',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'ws-xs': '16rem',
      'ws-sm': '22rem',
      'ws-md': '30rem',
      sm: '40rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
      '2xl': '96rem',
    },
    extend: {
      fontFamily: {
        default: ['var(--default-font)', ...defaultTheme.fontFamily.sans],
        heading: ['var(--header-font)', ...defaultTheme.fontFamily.sans],
        mono: [
          'SF Mono',
          'Monaco',
          'Menlo',
          'Courier',
          'monospace',
          ...defaultTheme.fontFamily.mono,
        ],
      },
      fontSize: {
        xs: '0.688rem',
        sm: '0.75rem',
        base: '0.813rem',
        lg: '1rem',
        xl: '1.15rem',
        '2xl': '1.363rem',
        '3xl': '1.753rem',
        '4xl': '2.041rem',
        '5xl': '2.552rem',
      },
      colors: {
        'brand-dark': {
          DEFAULT: '#09b6a2',
          50: '#effefa',
          100: '#c9fef3',
          200: '#93fce7',
          300: '#55f3d9',
          400: '#22dfc6',
          500: '#09b6a2',
          600: '#049d8e',
          700: '#087d73',
          800: '#0c635c',
          900: '#0f524d',
        },
        'brand-light': {
          DEFAULT: '#71E9D8',
          50: '#f0fdfa',
          100: '#cdfaf1',
          200: '#9bf4e4',
          300: '#71e9d8',
          400: '#31d0be',
          500: '#18b4a5',
          600: '#109187',
          700: '#12736e',
          800: '#135c58',
          900: '#144d4a',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
