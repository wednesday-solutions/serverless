import moment from 'moment';
import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';

export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }
      const { uuid } = JSON.parse(event.body);
      const dbResponse = await getDB().uuids.findOne({ where: { uuid }, raw: true });
      let newUUID;
      const { uuids } = getDB();
      if (dbResponse) {
        await uuids.update({ updatedAt: moment() }, { where: { id: dbResponse.id } });
        newUUID = await uuids.findOne({ where: { uuid }, raw: true });
      } else {
        newUUID = await uuids.create({ uuid });
      }
      return success(callback, {
        status: 200,
        body: JSON.stringify({ uuid: newUUID.uuid, updated_at: newUUID.updatedAt })
      });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
