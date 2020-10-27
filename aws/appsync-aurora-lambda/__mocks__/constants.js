import MockDate from 'mockdate';
import moment from 'moment';

MockDate.set('2000-11-22');

export const CONSTANTS = {
  uuid: 'uuid',
  updatedAt: moment().format('YYYY-MM-DD HH:mm:s:ss'),
  employee: {
    id: 1,
    employeeName: 'Tapan',
    officeId: null,
    updatedAt: '2020-10-25T16:02:21.000Z'
  },
  office: {
    id: 1,
    officeName: 'Wednesday Solutions',
    officeAddress: 'Pune, MH, India',
    employeeId: null,
    updatedAt: '2020-10-25T16:01:55.000Z'
  }
};
