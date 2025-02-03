import { Config } from 'jest';

const sharedConfig: Config = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '.',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  randomize: true,
};

export default sharedConfig;
