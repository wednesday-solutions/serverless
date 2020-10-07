import get from 'lodash/get';
import { getAllEmployees, getAllOffices } from '@daos/WednesdayERP';
import { addPagination, failure, success } from '@utils';

exports.handler = async (event, context, callback) => {
  const args = event.arguments;
  try {
    let allEmployeesRes = await getAllEmployees({
      limit: args.pagination.limit,
      nextToken: args.pagination.nextToken
    });

    allEmployeesRes.items = await Promise.all(
      allEmployeesRes.Items.map(async employee => {
        let officeRes = await getAllOffices({
          limit: get(args, 'pagination.nested.limit'),
          nextToken: get(args, 'pagination.nested.nextToken'),
          employeeId: employee.employeeId
        });
        officeRes = addPagination(officeRes);
        officeRes.items = officeRes.Items;
        employee.offices = officeRes;
        return employee;
      })
    );

    allEmployeesRes = addPagination(allEmployeesRes);
    return success(callback, allEmployeesRes);
  } catch (err) {
    return failure(callback, err);
  }
};
