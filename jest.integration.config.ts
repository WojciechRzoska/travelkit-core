import { Config } from 'jest';
import sharedConfig from './.jest.config';

const config: Config = {
  ...sharedConfig,
  testRegex: '.spec.ts$',
};

export default config;
