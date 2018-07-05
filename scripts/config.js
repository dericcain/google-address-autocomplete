import { resolve } from 'path';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const config = (isModule = true) => ({
  input: resolve(__dirname, 'src/index.js'),
  output: {
    file: isModule
      ? resolve(__dirname, 'dist/index.js')
      : resolve(__dirname, 'dist/google-address-autocomplete.min.js'),
    format: isModule ? 'cjs' : 'iife',
    moduleName: 'AddressAutocomplete',
    sourceMap: isModule,
  },
  plugins: [
    babel({
      exclude: './node_modules',
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
          },
        ],
      ],
      plugins: ['external-helpers'],
    }),
    uglify(),
  ],
});

export default config;
