import { resetAndMockDB } from '@utils/testUtils';
import { CONSTANTS } from '@mocks/constants';

describe('join-office-employee', () => {
  let event;
  let mocks;

  beforeEach(() => {
    event = require('../data.json');
    mocks = {
      callback: jest.fn()
    };
    jest.spyOn(mocks, 'callback');
  });
  it('should update/put an employee', async () => {
    await resetAndMockDB(mockDbs => {
      mockDbs.employeeOffice.create = () => true;
    });
    const handler = require('../index').handler;
    await handler(event, null, mocks.callback);
    expect(mocks.callback.mock.calls.length).toBe(1);
    expect(mocks.callback.mock.calls[0][0]).toBe(null);
    expect(mocks.callback.mock.calls[0][1]).toBeTruthy();
    expect(mocks.callback.mock.calls[0][1]).toEqual({
      status: 200,
      body: JSON.stringify({ res: true })
    });
  });

  it('should throw an error when req Id is missing', async () => {
    event.headers['x-ws-system-id'] = null;
    const handler = require('../index').handler;
    await handler(event, null, mocks.callback);
    expect(mocks.callback.mock.calls.length).toBe(1);
    expect(mocks.callback.mock.calls[0][0]).toStrictEqual(`Request Id Missing!`);
    expect(mocks.callback.mock.calls[0][1]).toBe(undefined);
  });
});
