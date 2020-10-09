import { updateEmployee } from '../../daos/WednesdayERP';
import { failure, getSystemId, success } from '@utils/index';

exports.handler = async (event, context, callback) => {
  try {
    console.log({ event });
    const args = event.arguments;
    const res = await updateEmployee({ ...getSystemId(event), ...args });
    return success(callback, res.Attributes);
  } catch (err) {
    return failure(callback, err);
  }
};
