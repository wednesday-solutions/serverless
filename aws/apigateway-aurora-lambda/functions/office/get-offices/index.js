import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { limit, offset, employeeId } = JSON.parse(event.body);
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

      return success(callback, {
        status: 200,
        body: JSON.stringify({ res })
      });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
