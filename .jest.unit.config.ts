import { Config } from 'jest';
import sharedConfig from './.jest.config';

const config: Config = {
  ...sharedConfig,
  testRegex: '.test.ts$',
};

export default config;
