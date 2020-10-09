import get from 'lodash/get';
import { getAllOffices, getEmployee } from '@daos/WednesdayERP';
import { addPagination, failure, getSystemId, success } from '@utils';

exports.handler = async (event, context, callback) => {
  const args = event.arguments;
  try {
    const employee = await getEmployee({ ...getSystemId(event), employeeId: args.employeeId });
    let officeRes = await getAllOffices({
      ...getSystemId(event),
      limit: get(args, 'nestedPagination.limit'),
      nextToken: get(args, 'nestedPagination.nextToken'),
      employeeId: employee.employeeId
    });
    officeRes = addPagination(officeRes);
    officeRes.items = officeRes.Items;
    employee.offices = officeRes;

    return success(callback, employee);
  } catch (err) {
    return failure(callback, err);
  }
};
