import MockDate from 'mockdate';
import moment from 'moment';

MockDate.set('2000-11-22');

export const CONSTANTS = {
  uuid: 'uuid',
  updatedAt: moment().format('YYYY-MM-DD HH:mm:s:ss')
};
