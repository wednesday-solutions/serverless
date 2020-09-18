import AWS from 'aws-sdk-mock';

export function successSendSMS(message, phoneNumber) {
  AWS.mock('SNS', 'publish', (params, callback) => {
    expect(params.Message).toEqual(message);
    expect(params.PhoneNumber).toEqual(phoneNumber);
    expect(params.MessageAttributes).toEqual({
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional'
      }
    });
    callback(null, 'published new sms');
  });
}

export function failureSendSMS(errorMessage) {
  AWS.mock('SNS', 'publish', (params, callback) => {
    callback(new Error(errorMessage), null);
  });
}
