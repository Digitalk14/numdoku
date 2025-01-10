import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'skeuomorphic': 'inset 0 1px 1px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.3)',
        'skeuomorphic-pressed': 'inset 0 2px 3px rgba(0,0,0,0.2)',
        'skeuomorphic-input': 'inset 0 2px 3px rgba(0,0,0,0.2), 0 1px 1px rgba(255,255,255,0.8)',
      },
      backgroundImage: {
        'metal-gradient': 'linear-gradient(145deg, #e6e9f0 0%, #eef1f5 100%)',
        'button-gradient': 'linear-gradient(145deg, #4b88e5 0%, #3b78d6 100%)',
      },
    },
  },
  plugins: [],
}

export default config
