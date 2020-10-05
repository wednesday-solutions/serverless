import '@babel/polyfill';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import dotEnv from 'dotenv';
import { mockDB } from '@utils/testUtils';

mockDB();
dotEnv.config({ path: '.env' });

const OLD_ENV = process.env;

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.resetModules();
  process.env = {
    ...OLD_ENV
  };

  AWSMock.setSDKInstance(AWS);
});
afterEach(() => {
  AWSMock.restore();
});
