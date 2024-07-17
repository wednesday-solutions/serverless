import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
import camelcaseKeys from 'camelcase-keys';

export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { limit, offset, employeeId } = event.arguments;
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
          officeList: camelcaseKeys(officeList),
          employee: camelcaseKeys(await employees.findOne({ where: { id: employeeId }, raw: true }))
        };
      }
      return success(callback, { items: res, pagination: { limit, offset } });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
