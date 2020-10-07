import { getEmployee, getOffice, updateRecord } from '@daos/WednesdayERP';
import { failure, getFirstFromArray, success } from '@utils/index';

exports.handler = async (event, context, callback) => {
  try {
    console.log({ event });
    const { officeId, employeeId } = event.arguments;
    // get employee
    const empRes = await getEmployee(employeeId);
    const employee = getFirstFromArray(empRes, { employeeId });

    // get office
    const officeRes = await getOffice(officeId);
    const office = getFirstFromArray(officeRes, { officeId });

    const employeeResult = await updateRecord({
      employeeEntry: true,
      ...employee,
      ...office,
      officeId,
      employeeId
    });
    const officeResult = await updateRecord({
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
};
