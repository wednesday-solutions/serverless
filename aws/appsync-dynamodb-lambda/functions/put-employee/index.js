import { updateEmployee } from '../../daos/WednesdayERP';
import { failure, stripPrefixFromPK, success } from '@utils/index';

exports.handler = async (event, context, callback) => {
  try {
    const args = event.arguments;
    const res = await updateEmployee(args);
    return success(callback, { ...stripPrefixFromPK(res.Attributes), ...res.Attributes });
  } catch (err) {
    return failure(callback, err);
  }
};
