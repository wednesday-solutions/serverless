import {
  getEmployee,
  getOffice,
  getAllEmployees,
  getAllOffices,
  updateRecord,
  updateOffice,
  updateEmployee
} from '@daos/WednesdayERP';
import {
  successGetEmployee,
  failureGetEmployee,
  successGetOffice,
  failureGetOffice,
  successGetEmployees,
  successGetEmployeesNext,
  successGetEmployeesByOfficeId,
  successGetOfficess,
  successGetOfficessNext,
  successGetOfficessByEmployeeId,
  successUpdateRecord,
  successUpdateOffice,
  successUpdateEmployee,
  successUpdateOfficeWithEmployeeId,
  successUpdateEmployeeWithOfficeId
} from '@mocks/db/wednesdayERP.mock';
import { connectToDynamoDB } from '@services/dynamodb';
import {
  CONSTANTS,
  GET_EMPLOYEE_RES,
  GET_OFFICE_RES,
  GET_ALL_EMPLOYEE_RES,
  GET_ALL_OFFICESS_RES
} from '@mocks/constants';

describe('usersDao', () => {
  let ddb;

  function connectToDDBAndSpy(method) {
    ddb = connectToDynamoDB(true);
    jest.spyOn(ddb, method);
  }

  describe('getEmployee', () => {
    it('should get the record ', async () => {
      successGetEmployee({ systemId: CONSTANTS.systemId, employeeId: CONSTANTS.employeeId });

      connectToDDBAndSpy('get');
      const response = await getEmployee({ systemId: CONSTANTS.systemId, employeeId: CONSTANTS.employeeId });

      expect(response).toBeTruthy();
      expect(response).toEqual(GET_EMPLOYEE_RES);
      expect(ddb.get.mock.calls.length).toBe(1);
    });

    it('should throw an error when employeeId is not passed', async () => {
      connectToDDBAndSpy('get');
      await expect(getEmployee({ systemId: CONSTANTS.systemId })).rejects.toEqual(
        new Error('values for employeeId: undefined is required')
      );
      expect(ddb.get.mock.calls.length).toBe(0);
    });
    it('should throw an error when there is no employee present', async () => {
      failureGetEmployee({ systemId: CONSTANTS.systemId, employeeId: CONSTANTS.employeeId });

      connectToDDBAndSpy('get');
      await expect(getEmployee({ systemId: CONSTANTS.systemId, employeeId: CONSTANTS.employeeId })).rejects.toEqual(
        new Error(`No employee with id: ${CONSTANTS.employeeId}`)
      );
      expect(ddb.get.mock.calls.length).toBe(1);
    });
  });

  describe('getOffice', () => {
    it('should get the record ', async () => {
      successGetOffice({ systemId: CONSTANTS.systemId, officeId: CONSTANTS.officeId });

      connectToDDBAndSpy('get');
      const response = await getOffice({ systemId: CONSTANTS.systemId, officeId: CONSTANTS.officeId });

      expect(response).toBeTruthy();
      expect(response).toEqual(GET_OFFICE_RES);
      expect(ddb.get.mock.calls.length).toBe(1);
    });

    it('should throw an error when employeeId is not passed', async () => {
      connectToDDBAndSpy('get');
      await expect(getOffice({ systemId: CONSTANTS.systemId })).rejects.toEqual(
        new Error('values for officeId: undefined is required')
      );
      expect(ddb.get.mock.calls.length).toBe(0);
    });

    it('should throw an error when there is no office present', async () => {
      failureGetOffice({ systemId: CONSTANTS.systemId, officeId: CONSTANTS.officeId });

      connectToDDBAndSpy('get');
      await expect(getOffice({ systemId: CONSTANTS.systemId, officeId: CONSTANTS.officeId })).rejects.toEqual(
        new Error(`No office with id: ${CONSTANTS.officeId}`)
      );
      expect(ddb.get.mock.calls.length).toBe(1);
    });
  });

  describe('getAllEmployees', () => {
    it('should get the records ', async () => {
      successGetEmployees({ systemId: CONSTANTS.systemId, limit: CONSTANTS.limit });

      connectToDDBAndSpy('query');
      const response = await getAllEmployees({ systemId: CONSTANTS.systemId, limit: CONSTANTS.limit });

      expect(response).toBeTruthy();
      expect(response).toEqual(GET_ALL_EMPLOYEE_RES);
      expect(ddb.query.mock.calls.length).toBe(1);
    });
    it('should get the next records when nextToken is provided', async () => {
      successGetEmployeesNext({ systemId: CONSTANTS.systemId, limit: CONSTANTS.limit, nextToken: CONSTANTS.nextToken });

      connectToDDBAndSpy('query');
      const response = await getAllEmployees({
        systemId: CONSTANTS.systemId,
        limit: CONSTANTS.limit,
        nextToken: CONSTANTS.nextToken
      });

      expect(response).toBeTruthy();
      expect(response).toEqual(GET_ALL_EMPLOYEE_RES);
      expect(ddb.query.mock.calls.length).toBe(1);
    });
    it('should get all employees of a particular office ', async () => {
      successGetEmployeesByOfficeId({
        systemId: CONSTANTS.systemId,
        limit: CONSTANTS.limit,
        officeId: CONSTANTS.officeId
      });

      connectToDDBAndSpy('query');
      const response = await getAllEmployees({
        systemId: CONSTANTS.systemId,
        limit: CONSTANTS.limit,
        officeId: CONSTANTS.officeId
      });

      expect(response).toBeTruthy();
      expect(response).toEqual(GET_ALL_EMPLOYEE_RES);
      expect(ddb.query.mock.calls.length).toBe(1);
    });
  });

  describe('getAllOfficess', () => {
    it('should get all the records ', async () => {
      successGetOfficess({ systemId: CONSTANTS.systemId, limit: CONSTANTS.limit });

      connectToDDBAndSpy('query');
      const response = await getAllOffices({ systemId: CONSTANTS.systemId, limit: CONSTANTS.limit });

      expect(response).toBeTruthy();
      expect(response).toEqual(GET_ALL_OFFICESS_RES);
      expect(ddb.query.mock.calls.length).toBe(1);
    });
    it('should get the next records when nextToken is provided', async () => {
      successGetOfficessNext({ systemId: CONSTANTS.systemId, limit: CONSTANTS.limit, nextToken: CONSTANTS.nextToken });

      connectToDDBAndSpy('query');
      const response = await getAllOffices({
        systemId: CONSTANTS.systemId,
        limit: CONSTANTS.limit,
        nextToken: CONSTANTS.nextToken
      });

      expect(response).toBeTruthy();
      expect(response).toEqual(GET_ALL_OFFICESS_RES);
      expect(ddb.query.mock.calls.length).toBe(1);
    });
    it('should get all officess for a particular employee ', async () => {
      const args = {
        systemId: CONSTANTS.systemId,
        limit: CONSTANTS.limit,
        employeeId: CONSTANTS.employeeId,
        nextToken: CONSTANTS.nextToken
      };
      successGetOfficessByEmployeeId(args);

      connectToDDBAndSpy('query');
      const response = await getAllOffices(args);

      expect(response).toBeTruthy();
      expect(response).toEqual(GET_ALL_OFFICESS_RES);
      expect(ddb.query.mock.calls.length).toBe(1);
    });
  });

  describe('updateRecord', () => {
    const args = {
      systemId: CONSTANTS.systemId,
      employeeName: CONSTANTS.employeeName,
      address: CONSTANTS.address,
      countryStateCity: CONSTANTS.countryStateCity,
      employeeId: CONSTANTS.employeeId,
      officeName: CONSTANTS.officeName,
      officeId: CONSTANTS.officeId
    };
    it('should updateRecord with employeeEntry', async () => {
      successUpdateRecord({ employeeEntry: true, ...args });

      connectToDDBAndSpy('update');
      const response = await updateRecord({ employeeEntry: true, ...args });

      expect(response).toBeTruthy();
      expect(response).toEqual({ Attributes: GET_OFFICE_RES });
      expect(ddb.update.mock.calls.length).toBe(1);
    });
    it('should updateRecord without employeeEntry', async () => {
      successUpdateRecord(args);

      connectToDDBAndSpy('update');
      const response = await updateRecord(args);

      expect(response).toBeTruthy();
      expect(response).toEqual({ Attributes: GET_EMPLOYEE_RES });
      expect(ddb.update.mock.calls.length).toBe(1);
    });
  });

  describe('updateOffice', () => {
    const args = {
      systemId: CONSTANTS.systemId,
      officeName: CONSTANTS.officeName,
      address: CONSTANTS.address,
      countryStateCity: CONSTANTS.countryStateCity,
      officeId: CONSTANTS.officeId,
      employeeName: CONSTANTS.employeeName
    };
    it('should updateOffice without employeeId', async () => {
      successUpdateOffice(args);

      connectToDDBAndSpy('update');
      const response = await updateOffice(args);

      expect(response).toBeTruthy();
      expect(response).toEqual({ Attributes: GET_OFFICE_RES });
      expect(ddb.update.mock.calls.length).toBe(1);
    });
    it('should updateOffice with employeeId', async () => {
      successUpdateOfficeWithEmployeeId({ employeeId: CONSTANTS.employeeId, ...args });

      connectToDDBAndSpy('update');
      const response = await updateOffice({ employeeId: CONSTANTS.employeeId, ...args });

      expect(response).toBeTruthy();
      expect(response).toEqual({ Attributes: GET_OFFICE_RES });
      expect(ddb.update.mock.calls.length).toBe(1);
    });
  });
  describe('updateEmployee', () => {
    const args = {
      systemId: CONSTANTS.systemId,
      officeName: CONSTANTS.officeName,
      address: CONSTANTS.address,
      countryStateCity: CONSTANTS.countryStateCity,
      employeeId: CONSTANTS.employeeId,
      employeeName: CONSTANTS.employeeName
    };
    it('should updateOffice without officeId', async () => {
      successUpdateEmployee(args);

      connectToDDBAndSpy('update');
      const response = await updateEmployee(args);

      expect(response).toBeTruthy();
      expect(response).toEqual({ Attributes: GET_EMPLOYEE_RES });
      expect(ddb.update.mock.calls.length).toBe(1);
    });
    it('should updateOffice with employeeId', async () => {
      successUpdateEmployeeWithOfficeId({ officeId: CONSTANTS.officeId, ...args });

      connectToDDBAndSpy('update');
      const response = await updateEmployee({ officeId: CONSTANTS.officeId, ...args });

      expect(response).toBeTruthy();
      expect(response).toEqual({ Attributes: GET_EMPLOYEE_RES });
      expect(ddb.update.mock.calls.length).toBe(1);
    });
  });
});
