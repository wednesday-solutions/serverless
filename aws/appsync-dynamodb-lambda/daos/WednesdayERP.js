import {connectToDynamoDB, getParamsForQuery, getParamsForScan, getWsErpTable} from '../services/dynamodb';
import {base64Decode} from '@utils';

export const GSI = {
  EMPLOYEE_ID: 'employeeId',
  OFFICE_ID: 'officeId',
  Address: 'Address'
};

export const getEmployee = async employeeId => {
  if (!employeeId) {
    throw new Error(`values for employeeId: ${employeeId} is required`);
  }
  const queryParams = {
    tableName: getWsErpTable(),
    indexName: GSI.EMPLOYEE_ID,
    keyExpression: `#${GSI.EMPLOYEE_ID} = :${GSI.EMPLOYEE_ID}`,
    attributeNames: {
      [`#${GSI.EMPLOYEE_ID}`]: GSI.EMPLOYEE_ID
    },
    attributeValues: {
      [`:${GSI.EMPLOYEE_ID}`]: employeeId
    }
  };
  const response = await connectToDynamoDB()
      .query(getParamsForQuery(queryParams))
      .promise();
  return response;
};
export const getOffice = async officeId => {
  if (!officeId) {
    throw new Error(`values for officeId: ${officeId} is required`);
  }
  const queryParams = {
    tableName: getWsErpTable(),
    indexName: GSI.OFFICE_ID,
    keyExpression: `#${GSI.OFFICE_ID} = :${GSI.OFFICE_ID}`,
    attributeNames: {
      [`#${GSI.OFFICE_ID}`]: GSI.OFFICE_ID
    },
    attributeValues: {
      [`:${GSI.OFFICE_ID}`]: officeId
    }
  };
  const response = await connectToDynamoDB()
      .query(getParamsForQuery(queryParams))
      .promise();
  return response;
};

export const getAllEmployees = async ({limit, nextToken}) => {
  if (nextToken) {
    try {
      nextToken = base64Decode(nextToken);
    } catch {
    }
  }
  const scanParams = {
    tableName: getWsErpTable(),
    indexName: `${GSI.EMPLOYEE_ID}`,
    exclusiveStartKey: nextToken,
    limit
  };

  return await connectToDynamoDB()
      .scan(getParamsForScan(scanParams))
      .promise();
};

export const getAllOffices = async ({nextToken, limit}) => {
  if (nextToken) {
    try {
      nextToken = base64Decode(nextToken);
    } catch {
    }
  }
  const scanParams = {
    tableName: getWsErpTable(),
    indexName: `${GSI.OFFICE_ID}`,
    exclusiveStartKey: nextToken,
    limit
  };

  return await connectToDynamoDB()
      .scan(getParamsForScan(scanParams))
      .promise();
};
