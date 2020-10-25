import { CONSTANTS } from '@mocks/constants';

export function configDB() {
  const SequelizeMock = require('sequelize-mock');
  const DBConnectionMock = new SequelizeMock();

  const uuidsMock = DBConnectionMock.define('uuids', { uuid: CONSTANTS.uuid, updated_at: CONSTANTS.updatedAt });
  const employeesMock = DBConnectionMock.define('employees', {
    employee_name: CONSTANTS.employee.employee_name,
    office_id: null,
    updated_at: CONSTANTS.updatedAt
  });
  const officesMock = DBConnectionMock.define('offices', {
    office_name: CONSTANTS.office.office_name,
    office_address: CONSTANTS.office.office_address,
    employee_id: null,
    updated_at: CONSTANTS.updatedAt
  });
  const employeeOfficeMock = DBConnectionMock.define('employee_office', {
    office_name: CONSTANTS.office.office_address,
    office_address: CONSTANTS.office.office_address,
    employee_name: CONSTANTS.employee.employee_name,
    employee_id: 1,
    office_id: 1
  });

  uuidsMock.findByPk = query => uuidsMock.findById(query);
  uuidsMock.count = () => 1;
  employeesMock.findByPk = query => employeesMock.findById(query);
  employeesMock.findAll = query => employeesMock.findAll(query);
  employeesMock.upsert = query => employeesMock.upsert(query);

  officesMock.findByPk = query => officesMock.findById(query);
  officesMock.findAll = query => officesMock.findAll(query);
  officesMock.upsert = query => officesMock.upsert(query);

  employeeOfficeMock.findAll = query => employeeOfficeMock.findAll(query);
  employeeOfficeMock.upsert = query => employeeOfficeMock.upsert(query);

  return {
    uuids: uuidsMock,
    employees: employeesMock,
    offices: officesMock,
    employee_office: employeeOfficeMock
  };
}

export async function mockDB(mockCallback = () => {}) {
  jest.doMock('@models', () => {
    const sequelizeData = configDB();
    if (mockCallback) {
      mockCallback(sequelizeData);
    }
    return { getDB: () => sequelizeData };
  });
}

export const resetAndMockDB = async (mockDBCallback = () => {}) => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.resetModules();
  await mockDB(mockDBCallback);
};
