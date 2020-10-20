import { handler } from '../index';
import { connectToDynamoDB } from '@services/dynamodb';
import { successGetEmployeesNext } from '@mocks/db/wednesdayERP.mock';
import { CONSTANTS, GET_ALL_OFFICESS_RES, GET_ALL_EMPLOYEE_RES } from '@mocks/constants';
describe('functions/onfido/applicant-check-status', () => {
  let event;
  let mocks;
  let ddb;

  beforeEach(() => {
    event = require('../data.json');
    mocks = {
      callback: jest.fn()
    };
    ddb = connectToDynamoDB(true);
    jest.spyOn(mocks, 'callback');
  });

  it('should get offices', async () => {
    event.arguments.officeId = CONSTANTS.officeId;
    event.arguments.pagination.limit = CONSTANTS.limit;
    event.arguments.pagination.nextToken = CONSTANTS.nextToken;
    event.arguments.pagination.nested.limit = CONSTANTS.limit;
    event.arguments.pagination.nested.nextToken = CONSTANTS.nextToken;
    ddb = connectToDynamoDB(true);
    mocks = { ...mocks, ddb };
    mocks.ddb = ddb;
    jest.spyOn(mocks.ddb, 'query');
    let count;
    mocks.ddb.query.mockImplementation(event => {
      if (!count) {
        count++;
        return { promise: () => new Promise(resolve => resolve(GET_ALL_OFFICESS_RES)) };
      } else {
        return { promise: () => new Promise(resolve => resolve(GET_ALL_EMPLOYEE_RES)) };
      }
    });
    await handler(event, null, mocks.callback);
    expect(mocks.callback.mock.calls.length).toBe(1);
    expect(mocks.ddb.query.mock.calls.length).toBe(2);
  });
  it('should throw an error when systemID is not present', async () => {
    event.headers = null;
    successGetEmployeesNext({
      systemId: CONSTANTS.systemId,
      nextToken: CONSTANTS.nextToken
    });

    await handler(event, null, mocks.callback);

    expect(mocks.callback.mock.calls.length).toBe(1);

    expect(mocks.callback.mock.calls[0][0]).toStrictEqual(`systemId is required`);
    expect(mocks.callback.mock.calls[0][1]).toBe(undefined);
  });
});
