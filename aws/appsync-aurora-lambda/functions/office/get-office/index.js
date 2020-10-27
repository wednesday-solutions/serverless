import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { officeId } = event.arguments;
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }
      const res = await getDB().offices.findOne({ where: { id: officeId }, raw: true });
      return success(callback, res);
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
