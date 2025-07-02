// postcss.config.js (fully ESM)
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [tailwindcss, autoprefixer],
};
