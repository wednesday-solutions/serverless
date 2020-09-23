import { CONSTANTS } from '@mocks/constants';

export function configDB() {
  const SequelizeMock = require('sequelize-mock');
  const DBConnectionMock = new SequelizeMock();

  const uuidsMock = DBConnectionMock.define('uuids', { uuid: CONSTANTS.uuid, updated_at: CONSTANTS.updatedAt });
  uuidsMock.findByPk = query => uuidsMock.findById(query);
  uuidsMock.count = () => 1;
  return {
    uuids: uuidsMock
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
