import { getEmployee, getOffice, updateRecord } from '@daos/WednesdayERP';
import { failure, getSystemId, logHandler, success } from '@utils/index';

exports.handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { officeId, employeeId } = event.arguments;

      // get employee
      const employee = await getEmployee({ ...getSystemId(event), employeeId });
      // get office
      const office = await getOffice({ ...getSystemId(event), officeId });

      const employeeResult = await updateRecord({
        ...getSystemId(event),
        employeeEntry: true,
        ...employee,
        ...office,
        officeId,
        employeeId
      });

      const officeResult = await updateRecord({
        ...getSystemId(event),
        employeeEntry: false,
        ...employee,
        ...office,
        officeId,
        employeeId
      });

      return success(callback, { office: officeResult.Attributes, employee: employeeResult.Attributes });
    } catch (err) {
      return failure(callback, err);
    }
  });
