import { v4 as uuid } from 'uuid';
import { getDB } from '@models';

export const handler = async (event, context, callback) => {
  const newUUID = uuid();
  const res = await getDB().uuids.create({ uuid: newUUID }, { raw: true });
  return { status: 200, body: JSON.stringify({ uuid: res.uuid, updated_at: res.updatedAt }) };
};
