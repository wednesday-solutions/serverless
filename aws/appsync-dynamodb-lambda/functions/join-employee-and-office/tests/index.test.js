import { handler } from '../index';
import { connectToDynamoDB } from '@services/dynamodb';
import { getEmployee } from '@mocks/db/wednesdayERP.mock';
import { CONSTANTS, GET_EMPLOYEE_RES, GET_OFFICE_RES } from '@mocks/constants';
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
    ddb = connectToDynamoDB(true);
    mocks = { ...mocks, ddb };
    mocks.ddb = ddb;
    jest.spyOn(mocks.ddb, 'get');
    jest.spyOn(mocks.ddb, 'update');
    let count = 0;
    const returns = [
      { promise: () => new Promise(resolve => resolve({ Item: GET_EMPLOYEE_RES })) },
      { promise: () => new Promise(resolve => resolve({ Item: GET_OFFICE_RES })) },
      { promise: () => new Promise(resolve => resolve({ Item: GET_OFFICE_RES })) },
      { promise: () => new Promise(resolve => resolve({ Item: GET_EMPLOYEE_RES })) }
    ];
    mocks.ddb.get.mockImplementation(event => {
      switch (count) {
        case 0:
          count++;
          return returns[count];
        case 1:
          count++;
          return returns[count];
      }
    });

    mocks.ddb.update.mockImplementation(event => {
      switch (count) {
        case 2:
          count++;
          return returns[count];
        case 3:
          return returns[count];
      }
    });
    await handler(event, null, mocks.callback);

    expect(mocks.callback.mock.calls.length).toBe(1);
    expect(mocks.ddb.get.mock.calls.length).toBe(2);
    expect(mocks.ddb.update.mock.calls.length).toBe(2);
    expect(mocks.callback.mock.calls[0][1]).toBeTruthy();
  });
  it('should throw an error when systemID is not present', async () => {
    event.arguments.employeeId = null;

    await handler(event, null, mocks.callback);

    expect(mocks.callback.mock.calls.length).toBe(1);

    expect(mocks.callback.mock.calls[0][0]).toStrictEqual(
      `values for employeeId: ${event.arguments.employeeId} is required`
    );
    expect(mocks.callback.mock.calls[0][1]).toBe(undefined);
  });
});
