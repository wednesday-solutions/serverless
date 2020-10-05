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
  keyExpression,
  indexName,
  attributeNames,
  attributeValues,
  tableName,
  scanIndexForward,
  consistentRead
}) => ({
  ScanIndexForward: scanIndexForward || false,
  ConsistentRead: consistentRead || false,
  TableName: tableName,
  IndexName: indexName || null,
  KeyConditionExpression: keyExpression,
  ExpressionAttributeNames: attributeNames,
  ExpressionAttributeValues: attributeValues,
  Limit: 2
});

export const getParamsForScan = ({
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
  ExclusiveStartKey: exclusiveStartKey
});

export const getWsErpTable = () => `WednesdayERP-${process.env.NAME}-${process.env.STAGE}`;
