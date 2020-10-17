import get from 'lodash/get';
import { getAllEmployees, getAllOffices } from '@daos/WednesdayERP';
import { addPagination, failure, getSystemId, logHandler, success } from '@utils';

exports.handler = async (event, context, callback) =>
  logHandler(event, async () => {
    const args = event.arguments;
    try {
      let officeResponse = await getAllOffices({
        ...getSystemId(event),
        limit: args.pagination.limit,
        nextToken: args.pagination.nextToken
      });
      console.log({ officeResponse });
      await Promise.all(
        officeResponse.Items.map(async office => {
          let employeesRes = await getAllEmployees({
            ...getSystemId(event),
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
  });
