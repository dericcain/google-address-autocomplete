import config from './scripts/config';

const moduleConfig = config();
const browserConfig = config(false);

export default [moduleConfig, browserConfig];
