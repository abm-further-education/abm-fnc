import type { Config } from 'tailwindcss';

const spacing = (): Record<number, string> => {
  const baseFontSize = 16; // 1rem = 16px
  const maxValueInPx = 800; // Maximum value in pixels
  const remValues: Record<number, string> = {};

  const maxRemValue = maxValueInPx / baseFontSize;

  for (let pxValue = 0; pxValue <= maxValueInPx; pxValue++) {
    const remValue = pxValue / baseFontSize;
    remValues[pxValue] = `${
      remValue <= maxRemValue ? remValue : maxRemValue
    }rem`;
  }

  return remValues;
};

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: spacing(),
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#E4C6AB',
        bg: '#3d3d3d',
      },
    },
  },
  plugins: [],
} satisfies Config;
