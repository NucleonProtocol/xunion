import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '960px',
    },
    extend: {
      colors: {
        theme: {
          DEFAULT: 'var(--xunion-color-theme)',
          secondary: 'var(--xunion-tc-secondary)',
          'non-opaque': 'var(--xunion-color-theme-non-opaque)',
        },
        tc: {
          DEFAULT: 'var(--xunion-color-theme)',
          primary: 'var(--xunion-tc-primary)',
          secondary: 'var(--xunion-tc-secondary)',
          tertiary: 'var( --xunion-tc-tertiary)',
          'on-button': 'var(--xunion-tc-on-button)',
        },
        background: {
          DEFAULT: 'var(--xunion-color-theme)',
          light: 'var(--xunion-color-theme-light)',
          primary: 'var(--xunion-bg-primary)',
          'e-primary': 'var(--xunion-bg-e-primary)',
          secondary: 'var(--xunion-bg-secondary)',
          'e-secondary': 'var(--xunion-bg-e-secondary)',
          toast: 'var(--xunion-toast)',
          separator: 'var(--xunion-separator-opaque)',
          'non-separator': 'var(--xunion-separator-non-opaque)',
        },
        fill: {
          primary: 'var(--xunion-fill-primary)',
          'e-primary': 'var(--xunion-fill-e-primary)',
          secondary: 'var(--xunion-fill-secondary)',
          'e-secondary': 'var(--xunion-fill-e-secondary)',
          niubi: 'var(--xunion-fill-niubi)',
          niubi2: 'var(--xunion-fill-niubi2)',
        },
        status: {
          info: 'var(--xunion-color-info)',
          error: 'var(--xunion-color-error)',
          warning: 'var(--xunion-color-warning)',
          success: 'var(--xunion-color-success)',
          'info-non-opaque': 'var(--xunion-color-info-non-opaque)',
          'warning-non-opaque': 'var(--xunion-color-warning-non-opaque)',
          'error-non-opaque': 'var(--xunion-color-error-non-opaque)',
        },
        line: {
          primary: 'var(--xunion-line-primary)',
          primary2: 'var(--xunion-line-primary2)',
        },
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1',
        '2xl': '1.5rem',
        full: '50%',
      },
      keyframes: {
        hide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        pop: {
          from: { transform: 'scale(1)', 'box-shadow': 'var(--box-shadow)' },
          to: {
            transform: 'scale(var(--scale))',
            'box-shadow': ' var(--box-shadow-picked-up)',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideIn: {
          from: {
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
        slideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        pop: 'pop 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22',
        fadeIn: 'fadeIn 500ms ease;',
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        spin: 'spin 1s linear infinite',
      },
      boxShadow: {
        sm: 'var(--xunion-shadow-sm)',
        md: 'var(--xunion-shadow-md)',
        lg: 'var(--xunion-shadow-lg)',
        xl: 'var(--xunion-shadow-xl)',
        xxl: 'var(--xunion-shadow-xxl)',
      },
    },
  },
};
export default config;
