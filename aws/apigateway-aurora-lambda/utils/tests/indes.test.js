import { failure, success, logHandler, getSystemId } from '@utils';
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
    it('should return null when no auth header is present', async () => {
      const event = {
        headers: {}
      };
      const response = getSystemId(event);
      expect(response).toEqual(null);
    });
  });
});
