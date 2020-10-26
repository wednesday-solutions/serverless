import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
import camelcaseKeys from 'camelcase-keys';

export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { limit, offset, employeeId } = event.arguments;
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }
      let res;
      const { offices, employeeOffice } = getDB();
      if (!employeeId) {
        res = await offices.findAll();
      } else {
        res = await employeeOffice.findAll({ limit, offset, where: { employee_id: employeeId } });
      }
      let response = [];
      res.map(async e => {
        await response.push(e.dataValues);
      });
      response = camelcaseKeys(response);
      return success(callback, { items: response, pagination: { limit, offset } });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
