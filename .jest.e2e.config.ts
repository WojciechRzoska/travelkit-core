import { Config } from 'jest'
import sharedConfig from './.jest.config'

const config: Config = {
  ...sharedConfig,
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
}

export default config
