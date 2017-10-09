import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const onPageAssetConfig = {
  input: './src/index.js',
  output: {
    file: 'dist/google-address-autocomplete.min.js',
    format: 'iife',
    moduleName: 'AddressAutocomplete',
    sourceMap: false,
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

export default onPageAssetConfig;
