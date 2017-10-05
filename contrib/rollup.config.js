import path from 'path';

export default {
  input: path.resolve(__dirname, '../src/index.js'),
  output: {
    file: 'contrib/CONTRIB_ONLY.js',
    format: 'iife',
    moduleName: 'AddressAutocomplete',
    sourceMap: false,
  }
};
