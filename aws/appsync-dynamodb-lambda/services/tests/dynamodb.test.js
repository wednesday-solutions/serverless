import { connectToDynamoDB, getParamsForGet, getParamsForQuery, getParamsForUpdate, getErpTable } from '../dynamodb';

describe('dbUtils', () => {
  let attributeNames;
  let attributeValues;
  let key;
  let returnValues;
  let tableName;
  let updateExpression;
  let keyExpression;

  beforeEach(() => {
    attributeNames = { '#id': 'id' };
    attributeValues = { ':id': 1 };
    key = { PK: `COGNITO_USER` };
    returnValues = 'UPDATED_FIELDS';
    tableName = 'users';
    updateExpression = 'SET #id = "id';
    keyExpression = '#PK = :PK';
  });
  describe('connectToDynamoDB', () => {
    it('when run locally region should be localhost and endpoint should be http://localhost:8000', () => {
      process.env.IS_LOCAL = true;
      const ddb = connectToDynamoDB(true);
      const ddb1 = connectToDynamoDB();
      expect(ddb).toEqual(ddb1);

      expect(ddb.options.region).toEqual('localhost');
      expect(ddb.options.endpoint).toEqual('http://localhost:8000/');
    });

    it('the API version should be fixed to 2012-08-10', () => {
      const ddb = connectToDynamoDB(true);
      expect(ddb.options.apiVersion).toEqual('2012-08-10');
    });
  });
  describe('getParamsForUpdate', () => {
    it('should format and return an object that can be passed to documentClient.put', () => {
      let putParams = getParamsForUpdate({
        attributeNames,
        attributeValues,
        key,
        returnValues,
        tableName,
        updateExpression
      });

      expect(putParams.ExpressionAttributeNames).toEqual(attributeNames);
      expect(putParams.ExpressionAttributeValues).toEqual(attributeValues);
      expect(putParams.Key).toEqual(key);
      expect(putParams.ReturnValues).toEqual(returnValues);
      expect(putParams.TableName).toEqual(tableName);
      expect(putParams.UpdateExpression).toEqual(updateExpression);

      // if returnValues is not passed it should default to `ALL_NEW`
      putParams = getParamsForUpdate({
        attributeNames,
        attributeValues,
        key,
        tableName,
        updateExpression
      });

      expect(putParams.ExpressionAttributeNames).toEqual(attributeNames);
      expect(putParams.ExpressionAttributeValues).toEqual(attributeValues);
      expect(putParams.Key).toEqual(key);
      expect(putParams.ReturnValues).toEqual(`ALL_NEW`);
      expect(putParams.TableName).toEqual(tableName);
      expect(putParams.UpdateExpression).toEqual(updateExpression);
    });
  });

  describe('getParamsForGet', () => {
    it('should format and return an object that can be passed to documentClient.get', () => {
      const getParams = getParamsForGet({ tableName, key });
      expect(getParams.Key).toEqual(key);
      expect(getParams.TableName).toEqual(tableName);
    });
  });
  describe('getParamsForQuery', () => {
    it('should format and return an object that can be passed to documentClient.query', () => {
      let queryParams = getParamsForQuery({ attributeNames, attributeValues, tableName, keyExpression });

      expect(queryParams.ExpressionAttributeNames).toEqual(attributeNames);
      expect(queryParams.ExpressionAttributeValues).toEqual(attributeValues);
      expect(queryParams.TableName).toEqual(tableName);
      expect(queryParams.KeyConditionExpression).toEqual(keyExpression);
      expect(queryParams.ScanIndexForward).toEqual(false);
      expect(queryParams.ConsistentRead).toEqual(false);

      queryParams = getParamsForQuery({
        attributeNames,
        attributeValues,
        tableName,
        keyExpression,
        scanIndexForward: true,
        consistentRead: true
      });
      expect(queryParams.ExpressionAttributeNames).toEqual(attributeNames);
      expect(queryParams.ExpressionAttributeValues).toEqual(attributeValues);
      expect(queryParams.TableName).toEqual(tableName);
      expect(queryParams.KeyConditionExpression).toEqual(keyExpression);
      expect(queryParams.ScanIndexForward).toEqual(true);
      expect(queryParams.ConsistentRead).toEqual(true);
    });
  });

  describe('getErpTable', () => {
    it('should return the name of the table based on the STAGE and NAME', () => {
      process.env.STAGE = 'dev';
      process.env.NAME = 'appsync-dynamodb-wednesday';
      const tableName = getErpTable();
      expect(tableName).toEqual(`MultiTenantERP-${process.env.NAME}-${process.env.STAGE}`);
    });
  });
});
