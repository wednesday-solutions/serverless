import { handler } from '../index';
import { connectToDynamoDB } from '@services/dynamodb';
import { successUpdateOfficeWithEmployeeId } from '@mocks/db/wednesdayERP.mock';
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
    event.arguments.officeId = CONSTANTS.officeId;
    event.arguments.officeName = CONSTANTS.officeName;
    event.arguments.address = CONSTANTS.address;
    event.arguments.countryStateCity = CONSTANTS.countryStateCity;
    event.arguments.employeeId = CONSTANTS.employeeId;
    successUpdateOfficeWithEmployeeId({
      systemId: CONSTANTS.systemId,
      officeName: CONSTANTS.officeName,
      address: CONSTANTS.address,
      countryStateCity: CONSTANTS.countryStateCity,
      officeId: CONSTANTS.officeId,
      employeeId: CONSTANTS.employeeId
    });

    ddb = connectToDynamoDB(true);
    mocks = { ...mocks, ddb };
    mocks.ddb = ddb;
    jest.spyOn(mocks.ddb, 'update');
    await handler(event, null, mocks.callback);

    expect(mocks.callback.mock.calls.length).toBe(1);
    expect(mocks.ddb.update.mock.calls.length).toBe(1);
    expect(mocks.callback.mock.calls[0][0]).toBe(null);
    expect(mocks.callback.mock.calls[0][1]).toBeTruthy();
  });

  it('should throw an error when employeeId is not present', async () => {
    event.arguments.officeName = null;
    successUpdateOfficeWithEmployeeId({
      systemId: CONSTANTS.systemId,
      officeName: event.arguments.officeName,
      address: CONSTANTS.address,
      countryStateCity: CONSTANTS.countryStateCity,
      officeId: CONSTANTS.officeId,
      employeeId: CONSTANTS.employeeId
    });
    await handler(event, null, mocks.callback);

    expect(mocks.callback.mock.calls.length).toBe(1);

    expect(mocks.callback.mock.calls[0][0]).toStrictEqual(
      `values for officeName: ${event.arguments.officeName} is required`
    );
    expect(mocks.callback.mock.calls[0][1]).toBe(undefined);
  });
});
