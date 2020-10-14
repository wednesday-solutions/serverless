import AWS from 'aws-sdk-mock';
import { GET_EMPLOYEE_RES, GET_OFFICE_RES, GET_ALL_EMPLOYEE_RES, GET_ALL_OFFICESS_RES } from '@mocks/constants';

export function successGetEmployee({ systemId, employeeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'get', async function(params, callback) {
    expect(params.Key).toEqual({ PK: systemId, SK: `EMPLOYEE_ID#${employeeId}` });
    callback(null, {
      Item: GET_EMPLOYEE_RES
    });
  });
}
export function failureGetEmployee({ systemId, employeeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'get', async function(params, callback) {
    expect(params.Key).toEqual({ PK: systemId, SK: `EMPLOYEE_ID#${employeeId}` });
    callback(null, {});
  });
}

export function successGetOffice({ systemId, officeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'get', async function(params, callback) {
    expect(params.Key).toEqual({ PK: systemId, SK: `OFFICE_ID#${officeId}` });
    callback(null, {
      Item: GET_OFFICE_RES
    });
  });
}

export function failureGetOffice({ systemId, officeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'get', async function(params, callback) {
    expect(params.Key).toEqual({ PK: systemId, SK: `OFFICE_ID#${officeId}` });
    callback(null, {});
  });
}

export function successGetEmployees({ systemId, limit, nextToken, officeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'query', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#PK': 'PK',
      '#SK': 'SK'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':PK': systemId,
      ':SK': `EMPLOYEE_ID#`
    });
    expect(params.KeyConditionExpression).toEqual('#PK = :PK and begins_with(#SK, :SK)');
    callback(null, GET_ALL_EMPLOYEE_RES);
  });
}

export function successGetEmployeesNext({ systemId, limit, nextToken, officeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'query', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#PK': 'PK',
      '#SK': 'SK'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':PK': systemId,
      ':SK': `EMPLOYEE_ID#`
    });
    expect(params.KeyConditionExpression).toEqual('#PK = :PK and begins_with(#SK, :SK)');
    expect(params.exclusiveStartKey).toEqual(nextToken);

    callback(null, GET_ALL_EMPLOYEE_RES);
  });
}

export function successGetEmployeesByOfficeId({ systemId, limit, nextToken, officeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'query', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#PK': 'PK',
      '#SK': 'SK',
      '#officeId': 'officeId'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':PK': systemId,
      ':SK': `EMPLOYEE_ID#`,
      ':officeId': officeId
    });
    expect(params.KeyConditionExpression).toEqual('#PK = :PK and begins_with(#SK, :SK)');
    expect(params.exclusiveStartKey).toEqual(nextToken);

    callback(null, GET_ALL_EMPLOYEE_RES);
  });
}

export function successGetOfficess({ systemId, limit, nextToken, employeeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'query', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#PK': 'PK',
      '#SK': 'SK'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':PK': systemId,
      ':SK': `OFFICE_ID#`
    });
    expect(params.KeyConditionExpression).toEqual('#PK = :PK and begins_with(#SK, :SK)');
    callback(null, GET_ALL_OFFICESS_RES);
  });
}

export function successGetOfficessNext({ systemId, limit, nextToken, employeeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'query', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#PK': 'PK',
      '#SK': 'SK'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':PK': systemId,
      ':SK': `OFFICE_ID#`
    });
    expect(params.KeyConditionExpression).toEqual('#PK = :PK and begins_with(#SK, :SK)');
    expect(params.exclusiveStartKey).toEqual(nextToken);

    callback(null, GET_ALL_OFFICESS_RES);
  });
}

export function successGetOfficessByEmployeeId({ systemId, limit, nextToken, employeeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'query', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#PK': 'PK',
      '#SK': 'SK',
      '#employeeId': 'employeeId'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':PK': systemId,
      ':SK': `OFFICE_ID#`,
      ':employeeId': employeeId
    });
    expect(params.KeyConditionExpression).toEqual('#PK = :PK and begins_with(#SK, :SK)');
    expect(params.exclusiveStartKey).toEqual(nextToken);

    callback(null, GET_ALL_OFFICESS_RES);
  });
}

export function successUpdateRecord({
  systemId,
  employeeEntry,
  employeeName,
  address,
  countryStateCity,
  employeeId,
  officeName,
  officeId
}) {
  AWS.mock('DynamoDB.DocumentClient', 'update', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#employeeName': 'employeeName',
      '#address': 'address',
      '#countryStateCity': 'countryStateCity',
      '#officeName': 'officeName',
      '#employeeId': 'employeeId',
      '#officeId': 'officeId'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':employeeName': employeeName,
      ':address': address,
      ':countryStateCity': countryStateCity,
      ':officeName': officeName,
      ':employeeId': employeeId,
      ':officeId': officeId
    });
    expect(params.Key).toEqual({
      PK: systemId,
      SK: employeeEntry ? `OFFICE_ID#${officeId}` : `EMPLOYEE_ID#${employeeId}`
    });
    callback(
      null,
      employeeEntry
        ? {
            Attributes: GET_OFFICE_RES
          }
        : {
            Attributes: GET_EMPLOYEE_RES
          }
    );
  });
}

export function successUpdateOffice({ systemId, officeName, address, countryStateCity, officeId, employeeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'update', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#officeName': 'officeName',
      '#officeId': 'officeId',
      '#address': 'address',
      '#countryStateCity': 'countryStateCity'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':officeName': officeName,
      ':officeId': officeId,
      ':address': address,
      ':countryStateCity': countryStateCity
    });
    expect(params.Key).toEqual({
      PK: systemId,
      SK: `OFFICE_ID#${officeId}`
    });
    callback(null, {
      Attributes: GET_OFFICE_RES
    });
  });
}

export function successUpdateOfficeWithEmployeeId({
  systemId,
  officeName,
  address,
  countryStateCity,
  officeId,
  employeeId
}) {
  AWS.mock('DynamoDB.DocumentClient', 'update', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#officeName': 'officeName',
      '#officeId': 'officeId',
      '#address': 'address',
      '#countryStateCity': 'countryStateCity',
      '#employeeId': 'employeeId'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':officeName': officeName,
      ':officeId': officeId,
      ':address': address,
      ':countryStateCity': countryStateCity,
      ':employeeId': employeeId
    });
    expect(params.Key).toEqual({
      PK: systemId,
      SK: `OFFICE_ID#${officeId}`
    });
    callback(null, {
      Attributes: GET_OFFICE_RES
    });
  });
}

export function successUpdateEmployee({ systemId, employeeId, employeeName, officeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'update', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#employeeName': 'employeeName',
      '#employeeId': 'employeeId'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':employeeName': employeeName,
      ':employeeId': employeeId
    });
    expect(params.Key).toEqual({
      PK: systemId,
      SK: `EMPLOYEE_ID#${employeeId}`
    });
    callback(null, {
      Attributes: GET_EMPLOYEE_RES
    });
  });
}

export function successUpdateEmployeeWithOfficeId({ systemId, employeeId, employeeName, officeId }) {
  AWS.mock('DynamoDB.DocumentClient', 'update', async function(params, callback) {
    expect(params.ExpressionAttributeNames).toEqual({
      '#employeeName': 'employeeName',
      '#employeeId': 'employeeId',
      '#officeId': 'officeId'
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':employeeName': employeeName,
      ':employeeId': employeeId,
      ':officeId': officeId
    });
    expect(params.Key).toEqual({
      PK: systemId,
      SK: `EMPLOYEE_ID#${employeeId}`
    });
    callback(null, {
      Attributes: GET_EMPLOYEE_RES
    });
  });
}
