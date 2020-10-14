import { v4 as uuid } from 'uuid';
import {
  connectToDynamoDB,
  getErpTable,
  getParamsForGet,
  getParamsForQuery,
  getParamsForUpdate
} from '@services/dynamodb';
import { base64Decode } from '@utils';

export const getEmployee = async ({ systemId, employeeId }) => {
  if (!employeeId) {
    throw new Error(`values for employeeId: ${employeeId} is required`);
  }
  const getParams = {
    tableName: getErpTable(),
    key: {
      PK: systemId,
      SK: `EMPLOYEE_ID#${employeeId}`
    }
  };

  const res = await connectToDynamoDB()
    .get(getParamsForGet(getParams))
    .promise();
  if (!res?.Item) {
    throw new Error(`No employee with id: ${employeeId}`);
  }
  return res.Item;
};

export const getOffice = async ({ systemId, officeId }) => {
  if (!officeId) {
    throw new Error(`values for officeId: ${officeId} is required`);
  }
  const queryParams = {
    tableName: getErpTable(),
    key: {
      PK: systemId,
      SK: `OFFICE_ID#${officeId}`
    }
  };

  const res = await connectToDynamoDB()
    .get(getParamsForGet(queryParams))
    .promise();

  if (!res?.Item) {
    throw new Error(`No office with id: ${officeId}`);
  }
  return res.Item;
};

export const getAllEmployees = async ({ systemId, limit, nextToken, officeId }) => {
  if (nextToken) {
    try {
      nextToken = base64Decode(nextToken);
    } catch {}
  }
  const queryParams = {
    tableName: getErpTable(),
    exclusiveStartKey: nextToken,
    limit,
    keyExpression: '#PK = :PK and begins_with(#SK, :SK)',
    attributeValues: {
      ':PK': systemId,
      ':SK': `EMPLOYEE_ID#`
    },
    attributeNames: {
      '#PK': 'PK',
      '#SK': 'SK'
    }
  };

  if (officeId) {
    queryParams.filterExpression = `#officeId = :officeId`;
    queryParams.attributeNames['#officeId'] = `officeId`;
    queryParams.attributeValues[`:officeId`] = officeId;
  }

  return await connectToDynamoDB()
    .query(getParamsForQuery(queryParams))
    .promise();
};

export const getAllOffices = async ({ systemId, nextToken, limit, employeeId }) => {
  if (nextToken) {
    try {
      nextToken = base64Decode(nextToken);
    } catch {}
  }
  const queryParams = {
    tableName: getErpTable(),
    exclusiveStartKey: nextToken,
    limit,
    keyExpression: '#PK = :PK and begins_with(#SK, :SK)',
    attributeValues: {
      ':PK': systemId,
      ':SK': `OFFICE_ID#`
    },
    attributeNames: {
      '#PK': 'PK',
      '#SK': 'SK'
    }
  };

  if (employeeId) {
    queryParams.filterExpression = ` #employeeId = :employeeId`;
    queryParams.attributeNames['#employeeId'] = `employeeId`;
    queryParams.attributeValues[`:employeeId`] = employeeId;
  }

  return await connectToDynamoDB()
    .query(getParamsForQuery(queryParams))
    .promise();
};

// update entities
export const updateRecord = async ({
  systemId,
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
      PK: systemId,
      SK: employeeEntry ? `OFFICE_ID#${officeId}` : `EMPLOYEE_ID#${employeeId}`
    },
    tableName: getErpTable(),
    updateExpression:
      'SET #employeeName = :employeeName, #address = :address, #countryStateCity = :countryStateCity, #officeName = :officeName, #employeeId = :employeeId, #officeId = :officeId'
  };
  return connectToDynamoDB()
    .update(getParamsForUpdate(putParams))
    .promise();
};

export const updateOffice = async ({ systemId, officeName, address, countryStateCity, officeId, employeeId }) => {
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
      PK: systemId,
      SK: `OFFICE_ID#${officeId}`
    },
    tableName: getErpTable(),
    updateExpression:
      'SET #officeName = :officeName, #address = :address, #countryStateCity = :countryStateCity, #officeId = :officeId'
  };
  if (employeeId) {
    putParams.updateExpression += `, #employeeId = :employeeId`;
    putParams.attributeNames['#employeeId'] = `employeeId`;
    putParams.attributeValues[`:employeeId`] = employeeId;
  }

  return connectToDynamoDB()
    .update(getParamsForUpdate(putParams))
    .promise();
};

export const updateEmployee = async ({ systemId, employeeId, employeeName, officeId }) => {
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
      PK: systemId,
      SK: `EMPLOYEE_ID#${employeeId}`
    },
    tableName: getErpTable(),
    updateExpression: 'SET #employeeName = :employeeName, #employeeId = :employeeId'
  };
  if (officeId) {
    putParams.updateExpression += `, #officeId = :officeId`;
    putParams.attributeNames['#officeId'] = `officeId`;
    putParams.attributeValues[`:officeId`] = officeId;
  }

  return connectToDynamoDB()
    .update(getParamsForUpdate(putParams))
    .promise();
};
