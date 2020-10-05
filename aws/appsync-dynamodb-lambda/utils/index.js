export const isLocal = () =>
  (process.env.IS_LOCAL && JSON.parse(process.env.IS_LOCAL)) ||
  (process.env.IS_OFFLINE && JSON.parse(process.env.IS_OFFLINE));

export const base64Encode = data => {
  try {
    data = JSON.stringify(data);
    const buff = new Buffer.from(data);
    return buff.toString('base64');
  } catch (err) {
    console.log({ err });
  }
  return null;
};

export const base64Decode = data => {
  try {
    data = JSON.stringify(data);
    const buff = new Buffer.from(data, 'base64');
    return JSON.parse(buff.toString('ascii'));
  } catch (err) {
    console.log({ err });
  }
  return null;
};

export const failure = (callback, error) => {
  console.log('failure', error);
  return callback(get(error, 'message', 'Something went wrong. Please contact support@bankshift.com'));
};

export const success = (callback, data) => {
  console.log('success', JSON.stringify(data));
  return callback(null, data);
};
