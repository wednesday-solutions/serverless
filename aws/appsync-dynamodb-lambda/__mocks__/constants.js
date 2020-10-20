export const CONSTANTS = {
  employeeName: 'Tapan',
  officeName: 'Wednesday Solutions',
  address: 'Clover Hills',
  officeId: '8b5c3219-b06f-4a6d-9edb-258c29f5b68b',
  employeeId: '220ac94b-97bb-4b9f-9a43-f1fb66f6c65b',
  company: 'WS',
  countryStateCity: '#IN#MH#PUN',
  systemId: 'WS',
  limit: 1,
  plainObj: { PK: 'WS', SK: 'EMPLOYEE_ID#220ac94b-97bb-4b9f-9a43-f1fb66f6c65b' },
  nextToken: 'eyJQSyI6IldTIiwiU0siOiJFTVBMT1lFRV9JRCMyMjBhYzk0Yi05N2JiLTRiOWYtOWE0My1mMWZiNjZmNmM2NWIifQ=='
};

export const GET_EMPLOYEE_RES = {
  employeeName: CONSTANTS.employeeName,
  officeName: CONSTANTS.officeName,
  address: CONSTANTS.address,
  officeId: CONSTANTS.officeId,
  SK: `EMPLOYEE_ID#${CONSTANTS.employeeId}`,
  employeeId: CONSTANTS.employeeId,
  PK: CONSTANTS.company,
  countryStateCity: CONSTANTS.countryStateCity
};

export const GET_OFFICE_RES = {
  employeeName: CONSTANTS.employeeName,
  officeName: CONSTANTS.officeName,
  address: CONSTANTS.address,
  officeId: CONSTANTS.officeId,
  SK: `OFFICE_ID#${CONSTANTS.employeeId}`,
  employeeId: CONSTANTS.employeeId,
  PK: CONSTANTS.company,
  countryStateCity: CONSTANTS.countryStateCity
};

export const GET_ALL_EMPLOYEE_RES = {
  Items: [GET_EMPLOYEE_RES],
  Count: CONSTANTS.limit,
  ScannedCount: 1,
  LastEvaluatedKey: { SK: `EMPLOYEE_ID#${CONSTANTS.employeeId}`, PK: CONSTANTS.company }
};

export const GET_ALL_OFFICESS_RES = {
  Items: [GET_OFFICE_RES],
  Count: 1,
  ScannedCount: 1,
  LastEvaluatedKey: { SK: `OFFICE_ID#${CONSTANTS.officeId}`, PK: CONSTANTS.company }
};
