export const isLocal = () =>
  (process.env.IS_LOCAL && JSON.parse(process.env.IS_LOCAL)) ||
  (process.env.IS_OFFLINE && JSON.parse(process.env.IS_OFFLINE));
