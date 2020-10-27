import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { officeName, officeAddress, employeeId } = JSON.parse(event.body);
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }
      const res = await getDB().offices.upsert({
        office_name: officeName,
        office_address: officeAddress,
        employee_id: employeeId
      });

      return success(callback, {
        status: 200,
        body: JSON.stringify({ res })
      });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });