import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { limit, offset, officeId } = JSON.parse(event.body);
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }
      let res;
      const employeeList = [];

      const { offices, employeeOffice, employees } = getDB();
      if (!officeId) {
        res = await employees.findAll();
      } else {
        const employeeOfficeRes = await employeeOffice.findAll({ limit, offset, where: { office_id: officeId } });
        await Promise.all(
          employeeOfficeRes.map(async e => {
            employeeList.push(await offices.findOne({ where: { id: e.dataValues.office_id }, raw: true }));
          })
        );
        res = {
          employeeList,
          office: await offices.findOne({ where: { id: officeId }, raw: true })
        };
      }
      console.log({ '####': JSON.stringify({ res }) });
      return success(callback, {
        status: 200,
        body: JSON.stringify({ res })
      });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
