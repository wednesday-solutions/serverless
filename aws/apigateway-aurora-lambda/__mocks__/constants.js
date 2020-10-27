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
export const GET_EMP_BY_OFF_ID =
  '{"res":{"employeeList":[{"office_name":"Wednesday Solutions","office_address":"Pune, MH, India","employee_id":null,"updated_at":"2000-11-22 05:30:0:00","id":1,"createdAt":"2000-11-22T00:00:00.000Z","updatedAt":"2000-11-22T00:00:00.000Z"}],"office":{"office_name":"Wednesday Solutions","office_address":"Pune, MH, India","employee_id":null,"updated_at":"2000-11-22 05:30:0:00","id":1,"createdAt":"2000-11-22T00:00:00.000Z","updatedAt":"2000-11-22T00:00:00.000Z"}}}';
export const GET_OFF_BY_EMP_ID =
  '{"res":{"officeList":[{"office_name":"Wednesday Solutions","office_address":"Pune, MH, India","employee_id":null,"updated_at":"2000-11-22 05:30:0:00","id":1,"createdAt":"2000-11-22T00:00:00.000Z","updatedAt":"2000-11-22T00:00:00.000Z"}],"employee":{"employee_name":"Tapan","office_id":null,"updated_at":"2000-11-22 05:30:0:00","id":1,"createdAt":"2000-11-22T00:00:00.000Z","updatedAt":"2000-11-22T00:00:00.000Z"}}}';
