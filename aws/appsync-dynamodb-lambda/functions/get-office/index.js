import get from 'lodash/get';
import { getAllEmployees, getOffice } from '@daos/WednesdayERP';
import { addPagination, failure, getFirstFromArray, success } from '@utils';

exports.handler = async (event, context, callback) => {
  const args = event.arguments;
  try {
    const officeResponse = await getOffice(args.officeId);
    await Promise.all(
      officeResponse.Items.map(async office => {
        let employeeRes = await getAllEmployees({
          limit: get(args, 'nestedPagination.limit'),
          nextToken: get(args, 'nestedPagination.nextToken'),
          officeId: office.officeId
        });
        employeeRes = addPagination(employeeRes);
        employeeRes.items = employeeRes.Items;
        office.employees = employeeRes;
      })
    );
    return success(callback, getFirstFromArray(officeResponse));
  } catch (err) {
    return failure(callback, err);
  }
};
