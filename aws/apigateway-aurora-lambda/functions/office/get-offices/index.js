import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { limit, offset, employeeId } = JSON.parse(event.body);
      if (!getSystemId(event)) {
        throw new Error('Request Id Missing!');
      }
      let res;
      const officeList = [];

      const { offices, employeeOffice, employees } = getDB();
      if (!employeeId) {
        res = await offices.findAll();
      } else {
        const employeeOfficeRes = await employeeOffice.findAll({ limit, offset, where: { employee_id: employeeId } });
        await Promise.all(
          employeeOfficeRes.map(async e => {
            officeList.push(await offices.findOne({ where: { id: e.dataValues.office_id }, raw: true }));
          })
        );
        res = {
          officeList,
          employee: await employees.findOne({ where: { id: employeeId }, raw: true })
        };
      }
      console.log({ '###': JSON.stringify({ res }) });
      return success(callback, {
        status: 200,
        body: JSON.stringify({ res })
      });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
