import get from 'lodash/get';
import { getAllEmployees, getAllOffices } from '@daos/WednesdayERP';
import { addPagination, failure, success } from '@utils';

exports.handler = async (event, context, callback) => {
  const args = event.arguments;
  try {
    let officeResponse = await getAllOffices({
      limit: args.pagination.limit,
      nextToken: args.pagination.nextToken
    });

    await Promise.all(
      officeResponse.Items.map(async office => {
        let employeesRes = await getAllEmployees({
          limit: get(args, 'pagination.nested.limit'),
          nextToken: get(args, 'pagination.nested.nextToken'),
          officeId: office.officeId
        });
        employeesRes = addPagination(employeesRes);
        employeesRes.items = employeesRes.Items;
        office.employees = employeesRes;
      })
    );

    officeResponse = addPagination(officeResponse);
    officeResponse.items = officeResponse.Items;
    return success(callback, officeResponse);
  } catch (err) {
    return failure(callback, err);
  }
};
