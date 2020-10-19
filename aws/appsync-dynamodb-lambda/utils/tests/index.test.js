import {
  isLocal,
  base64Encode,
  base64Decode,
  failure,
  success,
  getFirstFromArray,
  logHandler,
  addPagination,
  getSystemId
} from '@utils';
import { CONSTANTS } from '@mocks/constants';
describe('utils/index', () => {
  let mocks;
  beforeEach(() => {
    mocks = {
      callback: jest.fn()
    };
    jest.spyOn(mocks, 'callback');
    jest.spyOn(console, 'log');
  });

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

  describe('base64Encode', () => {
    it('should return decoded string', async () => {
      const response = base64Encode(CONSTANTS.plainObj);
      expect(response).toBeTruthy();
    });
    it('should return encode string', async () => {
      const response = base64Encode(null);
      expect(response).toBeFalsy();
    });
  });
  describe('base64Decode', () => {
    it('should return decoded string', async () => {
      const response = base64Decode(CONSTANTS.nextToken);
      expect(response).toEqual(CONSTANTS.plainObj);
    });
    it('should return decoded string', async () => {
      const response = base64Decode(null);
      expect(response).toBeFalsy();
    });
  });
  describe('failure', () => {
    it('should print the error and invoke the callback', () => {
      const error = new Error('some error');
      failure(mocks.callback, error);

      // ensure that the error is being printed
      expect(console.log.mock.calls[0][0]).toBe('failure');
      expect(console.log.mock.calls[0][1]).toBe(error);

      // check if callback has been invoked
      expect(mocks.callback).toBeCalled();

      // check the parameters that have been supplied to the callback
      expect(mocks.callback.mock.calls[0][0]).toBe(error.message);
      expect(mocks.callback.mock.calls[0][1]).toBe(undefined);
    });
  });

  describe('success', () => {
    it('should print the data and invoke the callback', () => {
      const data = { otpSentAt: '123123' };
      success(mocks.callback, data);

      // ensure that the data is being printed
      expect(console.log.mock.calls[0][0]).toBe('success');
      expect(console.log.mock.calls[0][1]).toBe(JSON.stringify(data));

      // check if callback has been invoked
      expect(mocks.callback).toBeCalled();

      // check the parameters that have been supplied to callback
      expect(mocks.callback.mock.calls[0][0]).toBe(null);
      expect(mocks.callback.mock.calls[0][1]).toBe(data);
    });
  });
  describe('getFirstFromArray', () => {
    it('should return first el', async () => {
      const mockDbResponse = {
        Items: [{ name: 'Tapan' }]
      };
      const response = getFirstFromArray(mockDbResponse, {});
      expect(response).toEqual({ name: 'Tapan' });
    });

    it('should throw error', async () => {
      const mockDbResponse = {
        Items: []
      };
      const response = getFirstFromArray(mockDbResponse, null);
      expect(response).toBeFalsy();
    });
  });
  describe('logHandler', () => {
    let mocks;
    beforeEach(() => {
      mocks = {
        callback: jest.fn()
      };
      jest.spyOn(mocks, 'callback');
    });
    it('should log the event and return callback', async () => {
      const mockEvent = {};
      logHandler(mockEvent, mocks.callback);
      expect(mocks.callback.mock.calls.length).toBe(1);
    });
  });
  describe('addPagination', () => {
    it('should addPagination', async () => {
      const mockDbResponse = {
        LastEvaluatedKey: CONSTANTS.plainObj
      };
      const response = addPagination(mockDbResponse);
      expect(response).toEqual({
        ...mockDbResponse,
        pagination: {
          nextToken: CONSTANTS.nextToken
        }
      });
    });
  });
  describe('getSystemId', () => {
    it('should return getSystemId', async () => {
      const event = {
        headers: { 'x-ws-system-id': 'WS' }
      };
      const response = getSystemId(event);
      expect(response).toEqual({
        systemId: event.headers['x-ws-system-id']
      });
    });
    it('should return decoded string', async () => {
      const event = {};
      const response = getSystemId(event);
      expect(response).toEqual({});
    });
  });
});
