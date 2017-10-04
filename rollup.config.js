import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    moduleName: 'AddressAutocomplete',
    sourceMap: true,
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
    }),
    uglify(),
  ],
};
