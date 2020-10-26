import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { employeeId } = event.arguments;
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }
      const res = await getDB().employees.findOne({ where: { id: employeeId }, raw: true });
      return success(callback, res);
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
