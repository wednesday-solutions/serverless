import { handler } from '../index';
import { CONSTANTS } from '@mocks/constants';
describe('get-uuid', () => {
  it('should get a new UUID', async () => {
    const response = await handler();
    const body = JSON.parse(response.body);
    console.log({ body });
    expect(body.uuid).toEqual(CONSTANTS.uuid);
  });
});
