import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { employeeId, officeId } = JSON.parse(event.body);
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }
      const { employees, offices, employeeOffice } = getDB();
      const employee = await employees.findOne({ where: { id: employeeId }, raw: true });
      const office = await offices.findOne({ where: { id: officeId }, raw: true });
      const res = await employeeOffice.upsert({
        office_id: office.id,
        employee_id: employee.id,
        employee_name: employee.employee_name,
        office_name: office.office_name,
        office_address: office.office_address
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
