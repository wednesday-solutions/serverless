import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { limit, offset, officeId } = JSON.parse(event.body);
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }
      let res;
      if (!officeId) {
        res = await getDB().employees.findAll();
      } else {
        res = await getDB().employee_office.findAll({ limit, offset, where: { office_id: officeId } });
      }
      console.log(res);
      return success(callback, {
        status: 200,
        body: JSON.stringify({ res })
      });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
