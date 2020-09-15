import { isLocal, } from '@utils';
import { CONSTANTS } from '@mocks/constants';

describe('utils/index', () => {
  describe('isLocal', () => {
    it('should return false when IS_LOCAL=false && IS_OFFLINE=false', async () => {
      const response = isLocal();
      expect(response).toBeFalsy();
    });

    it('should return true when IS_LOCAL=true && IS_OFFLINE=false', async () => {
      process.env.IS_LOCAL = true;
      const response = isLocal();
      expect(response).toBeTruthy();
    });
    it('should return true when IS_LOCAL=true && IS_OFFLINE=true', async () => {
      process.env.IS_OFFLINE = true;
      const response = isLocal();
      expect(response).toBeTruthy();
    });
  });
});
