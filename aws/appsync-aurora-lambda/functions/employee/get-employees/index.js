import { getDB } from '@models';
import { success, failure, logHandler, getSystemId } from '@utils';
import camelcaseKeys from 'camelcase-keys';

export const handler = async (event, context, callback) =>
  logHandler(event, async () => {
    try {
      const { limit, offset, officeId } = event.arguments;
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
            employeeList.push(await employees.findOne({ where: { id: e.dataValues.office_id }, raw: true }));
          })
        );
        res = {
          employeeList: camelcaseKeys(employeeList),
          office: camelcaseKeys(await offices.findOne({ where: { id: officeId }, raw: true }))
        };
      }

      return success(callback, { items: res, pagination: { limit, offset } });
    } catch (err) {
      console.log(err);
      return failure(callback, err);
    }
  });
