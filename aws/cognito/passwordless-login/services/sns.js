import AWS from 'aws-sdk';
import { isLocal } from '@utils';

let sns;
export function connectToSNS(forceNew) {
  if (sns && !forceNew) {
    return sns;
  }
  let region = process.env.REGION;
  if (isLocal()) {
    region = 'ap-south-1';
  }
  AWS.config.region = region;
  sns = new AWS.SNS({ region, apiVersion: '2010-03-31' });
  return sns;
}
export async function sendSMS(phoneNumber, message) {
  if (!phoneNumber || !message) {
    throw new Error(`phoneNumber: ${phoneNumber} and message: ${message} are required`);
  }
  console.log(`sending the following SMS: ${message} to ${phoneNumber}`);
  const params = {
    Message: message,
    PhoneNumber: phoneNumber,
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional'
      }
    }
  };

  return connectToSNS()
    .publish(params)
    .promise();
}
