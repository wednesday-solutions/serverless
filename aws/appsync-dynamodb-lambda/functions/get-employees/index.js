import get from 'lodash/get';
import { getAllEmployees, getAllOffices } from '@daos/WednesdayERP';
import { addPagination, failure, getSystemId, logHandler, success } from '@utils';

exports.handler = async (event, context, callback) =>
  logHandler(event, async () => {
    const args = event.arguments;
    try {
      let allEmployeesRes = await getAllEmployees({
        ...getSystemId(event),
        limit: args.pagination.limit,
        nextToken: args.pagination.nextToken
      });

      allEmployeesRes.items = await Promise.all(
        allEmployeesRes.Items.map(async employee => {
          let officeRes = await getAllOffices({
            ...getSystemId(event),
            limit: get(args, 'pagination.nested.limit'),
            nextToken: get(args, 'pagination.nested.nextToken'),
            employeeId: employee.employeeId
          });
          officeRes = addPagination(officeRes);
          console.log({ officeRes });
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
  });
