import get from 'lodash/get';
import camelcaseKeys from 'camelcase-keys';

export const failure = (callback, error) => {
  console.log('failure', error);
  return callback(get(error, 'message', 'Something went wrong. Please contact support@bankshift.com'));
};

export const success = (callback, data) => {
  console.log('success', JSON.stringify(data));
  return callback(null, camelcaseKeys(data));
};

export const getSystemId = event => {
  if (!event.headers['x-ws-system-id']) {
    return null;
  }
  return { systemId: event.headers['x-ws-system-id'] };
};

export const logHandler = (event, callback) => {
  console.log(JSON.stringify({ event }));
  return callback(event);
};
