import get from 'lodash/get';
import { getAllEmployees, getOffice } from '@daos/WednesdayERP';
import { addPagination, failure, getSystemId, logHandler, success } from '@utils';

exports.handler = async (event, context, callback) =>
  logHandler(event, async () => {
    const args = event.arguments;
    try {
      const office = await getOffice({ ...getSystemId(event), officeId: args.officeId });
      console.log({ office });

      let employeeRes = await getAllEmployees({
        ...getSystemId(event),
        limit: get(args, 'nestedPagination.limit'),
        nextToken: get(args, 'nestedPagination.nextToken'),
        officeId: office.officeId
      });
      employeeRes = addPagination(employeeRes);
      employeeRes.items = employeeRes.Items;
      office.employees = employeeRes;

      return success(callback, office);
    } catch (err) {
      return failure(callback, err);
    }
  });
