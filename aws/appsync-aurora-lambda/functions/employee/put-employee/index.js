import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { employeeName, officeId } = event.arguments;
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }
      const res = await getDB().employees.upsert({ employee_name: employeeName, office_id: officeId });
      return success(callback, { status: res });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
