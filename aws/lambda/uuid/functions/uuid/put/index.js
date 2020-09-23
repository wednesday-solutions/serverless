import moment from 'moment';
import { getDB } from '@models';

export const handler = async event => {
  const { uuid } = JSON.parse(event.body);
  const dbResponse = await getDB().uuids.findOne({ where: { uuid }, raw: true });
  let newUUID;
  if (dbResponse) {
    await getDB().uuids.update({ updatedAt: moment() }, { where: { id: dbResponse.id } });
    newUUID = await getDB().uuids.findOne({ where: { uuid }, raw: true });
  } else {
    newUUID = await getDB().uuids.create({ uuid });
  }
  return { status: 200, body: JSON.stringify({ uuid: newUUID.uuid, updated_at: newUUID.updatedAt }) };
};
