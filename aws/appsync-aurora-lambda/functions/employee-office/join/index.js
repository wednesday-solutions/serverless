import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { employeeId, officeId } = event.arguments;
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }

      const { employeeOffice } = getDB();

      const res = await employeeOffice.create({
        office_id: officeId,
        employee_id: employeeId
      });

      return success(callback, {
        id: res.id,
        employeeId: res.employee_id,
        officeId: res.office_id
      });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
