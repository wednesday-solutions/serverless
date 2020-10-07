import AWS from 'aws-sdk';
import { isLocal } from '@utils';

let ddb;

export const connectToDynamoDB = forceNew => {
  const region = process.env.REGION;
  if (ddb && !forceNew) {
    return ddb;
  }

  if (isLocal()) {
    ddb = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000/'
    });
  } else {
    ddb = new AWS.DynamoDB.DocumentClient({
      region,
      apiVersion: '2012-08-10'
    });
  }
  return ddb;
};

export const getParamsForUpdate = ({
  tableName,
  key,
  attributeNames,
  attributeValues,
  updateExpression,
  returnValues
}) => ({
  ExpressionAttributeNames: attributeNames,
  ExpressionAttributeValues: attributeValues,
  Key: key,
  ReturnValues: returnValues || 'ALL_NEW',
  TableName: tableName,
  UpdateExpression: updateExpression
});

export const getParamsForGet = ({ key, tableName, indexName }) => ({
  Key: key,
  TableName: tableName,
  IndexName: indexName
});

export const getParamsForQuery = ({
  key,
  keyExpression,
  indexName,
  attributeNames,
  attributeValues,
  tableName,
  scanIndexForward,
  consistentRead,
  limit,
  exclusiveStartKey
}) => ({
  ScanIndexForward: scanIndexForward || false,
  ConsistentRead: consistentRead || false,
  TableName: tableName,
  IndexName: indexName || null,
  KeyConditionExpression: keyExpression,
  ExpressionAttributeNames: attributeNames,
  ExpressionAttributeValues: attributeValues,
  Limit: limit,
  ExclusiveStartKey: exclusiveStartKey,
  KeyConditions: key
});

export const getParamsForScan = ({
  keyExpression,
  indexName,
  filterExpression,
  attributeNames,
  attributeValues,
  tableName,
  scanIndexForward,
  consistentRead,
  limit,
  exclusiveStartKey
}) => ({
  ScanIndexForward: scanIndexForward || false,
  ConsistentRead: consistentRead || false,
  TableName: tableName,
  IndexName: indexName || null,
  KeyConditionExpression: keyExpression,
  ExpressionAttributeNames: attributeNames,
  ExpressionAttributeValues: attributeValues,
  Limit: limit,
  ExclusiveStartKey: exclusiveStartKey,
  FilterExpression: filterExpression
});

export const getWsErpTable = () => `WednesdayERP-${process.env.NAME}-${process.env.STAGE}`;
