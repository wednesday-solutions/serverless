import MockDate from 'mockdate';
import moment from 'moment';

MockDate.set('2000-11-22');

export const CONSTANTS = {
  uuid: 'uuid',
  updatedAt: moment().format('YYYY-MM-DD HH:mm:s:ss'),
  employee: {
    id: 1,
    employee_name: 'Tapan',
    office_id: null,
    updated_at: '2020-10-25T16:02:21.000Z'
  },
  office: {
    id: 1,
    office_name: 'Wednesday Solutions',
    office_address: 'Pune, MH, India',
    employee_id: null,
    updated_at: '2020-10-25T16:01:55.000Z'
  }
};
