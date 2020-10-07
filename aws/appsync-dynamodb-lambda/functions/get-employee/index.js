import get from 'lodash/get';
import { getAllOffices, getEmployee } from '@daos/WednesdayERP';
import { addPagination, failure, getFirstFromArray, success } from '@utils';

exports.handler = async (event, context, callback) => {
  const args = event.arguments;
  try {
    const employeeResponse = await getEmployee(args.employeeId);
    await Promise.all(
      employeeResponse.Items.map(async employee => {
        let officeRes = await getAllOffices({
          limit: get(args, 'nestedPagination.limit'),
          nextToken: get(args, 'nestedPagination.nextToken'),
          employeeId: employee.employeeId
        });
        officeRes = addPagination(officeRes);
        officeRes.items = officeRes.Items;
        employee.offices = officeRes;
      })
    );
    return success(callback, getFirstFromArray(employeeResponse));
  } catch (err) {
    return failure(callback, err);
  }
};
