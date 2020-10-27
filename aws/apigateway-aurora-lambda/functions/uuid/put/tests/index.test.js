import { CONSTANTS } from '@mocks/constants';
import { resetAndMockDB } from '@utils/testUtils';

describe('put-uuid', () => {
  let mocks;
  let event;

  beforeEach(() => {
    event = require('../data.json');

    mocks = {
      callback: jest.fn()
    };
    jest.spyOn(mocks, 'callback');
  });
  it('should update the updatedAt if the UUID is already present', async () => {
    resetAndMockDB();
    const handler = require('../index').handler;
    await handler({ body: `{"uuid": "${CONSTANTS.uuid}"}`, headers: event.headers }, null, mocks.callback);
    expect(mocks.callback.mock.calls.length).toBe(1);
    expect(mocks.callback.mock.calls[0][0]).toBe(null);
    expect(mocks.callback.mock.calls[0][1]).toBeTruthy();
  });

  it('should add a new UUID', async () => {
    const newUUID = 'uuid1';
    await resetAndMockDB(mockDbs => {
      mockDbs.uuids.findOne = () => null;
      mockDbs.uuids.create = () => ({ uuid: newUUID, updatedAt: CONSTANTS.updatedAt });
    });
    const handler = require('../index').handler;
    await handler({ body: `{"uuid": "${CONSTANTS.uuid}"}`, headers: event.headers }, null, mocks.callback);
    expect(mocks.callback.mock.calls.length).toBe(1);
    expect(mocks.callback.mock.calls[0][0]).toBe(null);
    expect(mocks.callback.mock.calls[0][1]).toBeTruthy();
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
