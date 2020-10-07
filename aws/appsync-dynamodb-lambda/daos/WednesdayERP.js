import { v4 as uuid } from 'uuid';
import {
  connectToDynamoDB,
  getParamsForQuery,
  getParamsForScan,
  getParamsForUpdate,
  getWsErpTable
} from '@services/dynamodb';
import { base64Decode } from '@utils';

export const GSI = {
  EMPLOYEE_ID: 'employeeId',
  OFFICE_ID: 'officeId',
  Address: 'address'
};

export const getEmployee = async employeeId => {
  if (!employeeId) {
    throw new Error(`values for employeeId: ${employeeId} is required`);
  }
  const queryParams = {
    tableName: getWsErpTable(),
    keyExpression: `#PK = :PK`,
    attributeNames: {
      '#PK': 'PK'
    },
    attributeValues: {
      ':PK': `${GSI.EMPLOYEE_ID}#${employeeId}`
    }
  };
  return await connectToDynamoDB()
    .query(getParamsForQuery(queryParams))
    .promise();
};

export const getOffice = async officeId => {
  if (!officeId) {
    throw new Error(`values for officeId: ${officeId} is required`);
  }
  const queryParams = {
    tableName: getWsErpTable(),
    keyExpression: `#PK = :PK`,
    attributeNames: {
      '#PK': 'PK'
    },
    attributeValues: {
      ':PK': `${GSI.OFFICE_ID}#${officeId}`
    }
  };
  return await connectToDynamoDB()
    .query(getParamsForQuery(queryParams))
    .promise();
};

export const getAllEmployees = async ({ limit, nextToken, officeId }) => {
  if (nextToken) {
    try {
      nextToken = base64Decode(nextToken);
    } catch {}
  }
  const scanParams = {
    tableName: getWsErpTable(),
    indexName: GSI.EMPLOYEE_ID,
    exclusiveStartKey: nextToken,
    limit,
    attributeNames: {
      '#PK': 'PK'
    },
    attributeValues: {
      [`:PK`]: `${GSI.EMPLOYEE_ID}#`
    },
    filterExpression: 'begins_with(#PK,:PK)'
  };

  if (officeId) {
    scanParams.filterExpression += ` and #SK = :SK`;
    scanParams.attributeNames['#SK'] = `SK`;
    scanParams.attributeValues[`:SK`] = `${GSI.OFFICE_ID}#${officeId}`;
  }

  return await connectToDynamoDB()
    .scan(getParamsForScan(scanParams))
    .promise();
};

export const getAllOffices = async ({ nextToken, limit, employeeId }) => {
  if (nextToken) {
    try {
      nextToken = base64Decode(nextToken);
    } catch {}
  }
  const scanParams = {
    tableName: getWsErpTable(),
    indexName: GSI.OFFICE_ID,
    exclusiveStartKey: nextToken,
    limit,
    attributeNames: {
      '#PK': 'PK'
    },
    attributeValues: {
      ':PK': `${GSI.OFFICE_ID}#`
    },
    filterExpression: 'begins_with(#PK,:PK)'
  };

  if (employeeId) {
    scanParams.filterExpression += ` and #SK = :SK`;
    scanParams.attributeNames['#SK'] = `SK`;
    scanParams.attributeValues[`:SK`] = `${GSI.EMPLOYEE_ID}#${employeeId}`;
  }

  return await connectToDynamoDB()
    .scan(getParamsForScan(scanParams))
    .promise();
};

// update entities
export const updateRecord = async ({
  employeeEntry,
  employeeName,
  address,
  countryStateCity,
  employeeId,
  officeName,
  officeId
}) => {
  const putParams = {
    attributeNames: {
      '#employeeName': 'employeeName',
      '#address': 'address',
      '#countryStateCity': 'countryStateCity',
      '#officeName': 'officeName',
      '#employeeId': 'employeeId',
      '#officeId': 'officeId'
    },
    attributeValues: {
      ':employeeName': employeeName,
      ':address': address,
      ':countryStateCity': countryStateCity,
      ':officeName': officeName,
      ':employeeId': employeeId,
      ':officeId': officeId
    },
    key: {
      PK: employeeEntry ? `${GSI.EMPLOYEE_ID}#${employeeId}` : `${GSI.OFFICE_ID}#${officeId}`,
      SK: employeeEntry ? `${GSI.OFFICE_ID}#${officeId}` : `${GSI.EMPLOYEE_ID}#${employeeId}`
    },
    tableName: getWsErpTable(),
    updateExpression:
      'SET #employeeName = :employeeName, #address = :address, #countryStateCity = :countryStateCity, #officeName = :officeName, #employeeId = :employeeId, #officeId = :officeId'
  };

  return connectToDynamoDB()
    .update(getParamsForUpdate(putParams))
    .promise();
};

export const updateOffice = async ({ officeName, address, countryStateCity, officeId, employeeId }) => {
  officeId = officeId || uuid();
  const putParams = {
    attributeNames: {
      '#officeName': 'officeName',
      '#officeId': 'officeId',
      '#address': 'address',
      '#countryStateCity': 'countryStateCity'
    },
    attributeValues: {
      ':officeName': officeName,
      ':officeId': officeId,
      ':address': address,
      ':countryStateCity': countryStateCity
    },
    key: {
      PK: `${GSI.OFFICE_ID}#${officeId}`,
      SK: employeeId ? `${GSI.EMPLOYEE_ID}#${employeeId}` : officeId
    },
    tableName: getWsErpTable(),
    updateExpression:
      'SET #officeName = :officeName, #address = :address, #countryStateCity = :countryStateCity, #officeId = :officeId'
  };
  return connectToDynamoDB()
    .update(getParamsForUpdate(putParams))
    .promise();
};

export const updateEmployee = async ({ employeeId, employeeName, officeId }) => {
  employeeId = employeeId || uuid();
  const putParams = {
    attributeNames: {
      '#employeeName': 'employeeName',
      '#employeeId': 'employeeId'
    },
    attributeValues: {
      ':employeeName': employeeName,
      ':employeeId': employeeId
    },
    key: {
      PK: `${GSI.EMPLOYEE_ID}#${employeeId}`,
      SK: officeId ? `${GSI.OFFICE_ID}#${officeId}` : employeeId
    },
    tableName: getWsErpTable(),
    updateExpression: 'SET #employeeName = :employeeName, #employeeId = :employeeId'
  };
  return connectToDynamoDB()
    .update(getParamsForUpdate(putParams))
    .promise();
};
