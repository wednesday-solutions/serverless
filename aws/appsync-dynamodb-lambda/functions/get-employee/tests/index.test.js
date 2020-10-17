import { handler } from '../index';
import { connectToDynamoDB } from '@services/dynamodb';
import { successGetEmployee, successGetOfficessByEmployeeId } from '@mocks/db/wednesdayERP.mock';
import { CONSTANTS } from '@mocks/constants';
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

  it('should get employee', async () => {
    event.arguments.employeeId = CONSTANTS.employeeId;
    event.arguments.nestedPagination.limit = CONSTANTS.limit;
    event.arguments.nestedPagination.nextToken = CONSTANTS.nextToken;
    successGetEmployee({ systemId: CONSTANTS.systemId, employeeId: CONSTANTS.employeeId });
    successGetOfficessByEmployeeId({
      systemId: CONSTANTS.systemId,
      limit: CONSTANTS.limit,
      nextToken: CONSTANTS.nextToken,
      employeeId: CONSTANTS.employeeId
    });
    ddb = connectToDynamoDB(true);
    mocks = { ...mocks, ddb };
    mocks.ddb = ddb;
    jest.spyOn(mocks.ddb, 'get');
    await handler(event, null, mocks.callback);

    expect(mocks.callback.mock.calls.length).toBe(1);
    expect(mocks.ddb.get.mock.calls.length).toBe(1);
    expect(mocks.callback.mock.calls[0][0]).toBe(null);
    expect(mocks.callback.mock.calls[0][1]).toBeTruthy();
  });

  it('should throw an error when employeeId is not present', async () => {
    event.arguments.employeeId = null;
    successGetEmployee({ systemId: CONSTANTS.systemId, employeeId: event.arguments.employeeId });
    await handler(event, null, mocks.callback);

    expect(mocks.callback.mock.calls.length).toBe(1);

    expect(mocks.callback.mock.calls[0][0]).toStrictEqual(
      `values for employeeId: ${event.arguments.employeeId} is required`
    );
    expect(mocks.callback.mock.calls[0][1]).toBe(undefined);
  });
});
