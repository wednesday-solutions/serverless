import { CONSTANTS } from '@mocks/constants';
import { resetAndMockDB } from '@utils/testUtils';

describe('put-uuid', () => {
  it('should update the updatedAt if the UUID is already present', async () => {
    resetAndMockDB();
    const handler = require('../index').handler;
    const response = await handler({ body: `{"uuid": "${CONSTANTS.uuid}"}` });
    const body = JSON.parse(response.body);
    expect(body.uuid).toEqual(CONSTANTS.uuid);
    expect(body.updated_at).toEqual('2000-11-22T00:00:00.000Z');
  });

  it('should add a new UUID', async () => {
    const newUUID = 'uuid1';
    await resetAndMockDB(mockDbs => {
      mockDbs.uuids.findOne = () => null;
      mockDbs.uuids.create = () => ({ uuid: newUUID, updatedAt: CONSTANTS.updatedAt });
    });
    const handler = require('../index').handler;
    const response = await handler({ body: `{"uuid": "${CONSTANTS.uuid}"}` });
    const body = JSON.parse(response.body);
    expect(body.uuid).toEqual(newUUID);
    expect(body.updated_at).toEqual(CONSTANTS.updatedAt);
  });
});
