/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Option 1: Cinzel (Roman/Medieval capitals - best for headers)
        serif: ['Cinzel', 'Georgia', 'serif'],
        
        // Alternative options (uncomment the one you prefer):
        // Option 2: Uncial Antiqua (Medieval manuscript style)
        // serif: ['Uncial Antiqua', 'Georgia', 'serif'],
        
        // Option 3: IM Fell DW Pica (Historical typeface)
        // serif: ['IM Fell DW Pica', 'Georgia', 'serif'],
        
        // Option 4: MedievalSharp (Direct medieval theme)
        // serif: ['MedievalSharp', 'Georgia', 'serif'],
        
        // Option 5: Almendra (Medieval manuscript)
        // serif: ['Almendra', 'Georgia', 'serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.red.600'),
              '&:hover': {
                color: theme('colors.red.700'),
              },
            },
            h1: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '700',
            },
            h2: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '600',
            },
            h3: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '600',
            },
            h4: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '600',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: theme('colors.gray.300'),
            },
            code: {
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.md'),
              padding: theme('spacing.1'),
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
            strong: {
              color: 'inherit',
              fontWeight: '700',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.red.400'),
              '&:hover': {
                color: theme('colors.red.300'),
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            h4: {
              color: theme('colors.gray.100'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.gray.700'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            strong: {
              color: theme('colors.gray.100'),
              fontWeight: '700',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};