import { updateOffice } from '@daos/WednesdayERP';
import { failure, success } from '@utils/index';

exports.handler = async (event, context, callback) => {
  try {
    const args = event.arguments;
    const res = await updateOffice(args);
    return success(
      callback,

      res.Attributes
    );
  } catch (err) {
    return failure(callback, err);
  }
};
