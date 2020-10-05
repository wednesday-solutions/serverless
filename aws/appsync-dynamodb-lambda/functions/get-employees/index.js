import {getAllEmployees, getEmployee} from '../../daos/WednesdayERP';
import {base64Encode, failure, success} from '@utils';

exports.handler = async (event, context, callback) => {
  const args = event.arguments;
  const employeeRes = {};
  try {
    if (args.employeeId) {
      const employeeResponse = await getEmployee(args.employeeId);
      employeeRes.items = employeeResponse.Items;
    } else {
      const employeeResponse = await getAllEmployees({
        limit: args.pagination.limit,
        nextToken: args.pagination.nextToken
      });
      if (employeeResponse.LastEvaluatedKey) {
        employeeRes.pagination = {nextToken: base64Encode(employeeResponse.LastEvaluatedKey)};
      }
      employeeRes.items = employeeResponse.Items;
    }
  } catch (err) {
    return failure(callback, err)
  }
  return success(callback, employeeRes);
};
