import { updateOffice } from '@daos/WednesdayERP';
import { failure, getSystemId, logHandler, success } from '@utils/index';

exports.handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const args = event.arguments;
      const res = await updateOffice({ ...getSystemId(event), ...args });
      return success(callback, res.Attributes);
    } catch (err) {
      return failure(callback, err);
    }
  });
