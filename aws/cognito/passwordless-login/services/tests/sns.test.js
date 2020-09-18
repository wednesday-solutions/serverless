import { connectToSNS, sendSMS } from '@services/sns';
import { successSendSMS } from '@mocks/services/sms.mock';
import { CONSTANTS } from '@mocks/constants';

describe('connectToSNS', () => {
  it('should connectToSNS with region from process.env.REGION', () => {
    const region = 'us-east-1';
    process.env.IS_LOCAL = false;
    process.env.REGION = region;
    const sns = connectToSNS();
    expect(sns.config.region).toEqual(region);
  });
  it('should connectToSNS with ap-south-1 when running locally', () => {
    process.env.IS_LOCAL = true;
    const sns = connectToSNS(true);
    expect(sns.config.region).toEqual('ap-south-1');
  });
});
describe('sendSMS', () => {
  it(' should send the SMS', async () => {
    successSendSMS(CONSTANTS.message, CONSTANTS.phoneNumber);

    const sns = connectToSNS(true);
    jest.spyOn(sns, 'publish');

    const snsResponse = await sendSMS(CONSTANTS.phoneNumber, CONSTANTS.message);
    expect(snsResponse).toBeTruthy();

    expect(sns.publish.mock.calls.length).toBe(1);
  });

  it(' should  throw and error when the phonenumber || message are not passed', async () => {
    successSendSMS(CONSTANTS.phoneNumber);

    const sns = await connectToSNS(true);
    jest.spyOn(sns, 'publish');

    await expect(sendSMS(CONSTANTS.phoneNumber)).rejects.toEqual(
      new Error(`phoneNumber: ${CONSTANTS.phoneNumber} and message: ${undefined} are required`)
    );
    expect(sns.publish.mock.calls.length).toBe(0);
  });
});
