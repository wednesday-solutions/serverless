import { handler } from '../index';
import { failureSendSMS, successSendSMS } from '@mocks/services/sms.mock';
import { CONSTANTS } from '@mocks/constants';
import { connectToSNS } from '@services/sns';

describe('cognito-triggers/create-auth-challenge', () => {
  let event;
  let mocks;
  beforeEach(() => {
    event = require('../data.json');
  });
  it('should send the OTP to the correct phone number', async () => {
    successSendSMS(
      `Use the following OTP: ${CONSTANTS.code} to login to the Wednesday Application`,
      CONSTANTS.phoneNumber
    );
    const sns = connectToSNS(true);
    mocks = {
      sns
    };
    jest.spyOn(mocks.sns, 'publish');
    event.request.userAttributes.phone_number = CONSTANTS.phoneNumber;
    const eventResponse = await handler(event);
    expect(mocks.sns.publish.mock.calls.length).toBe(1);
    expect(eventResponse.response.privateChallengeParameters).toEqual({ code: CONSTANTS.code });
    expect(eventResponse.response.challengeMetadata).toBe(`CODE-${CONSTANTS.code}`);
  });
  it('should send the OTP to the correct phone number', async () => {
    const errorMessage = 'Failed to send SMS';
    failureSendSMS(errorMessage);
    const sns = connectToSNS(true);
    mocks = {
      sns
    };
    jest.spyOn(mocks.sns, 'publish');
    event.request.userAttributes.phone_number = CONSTANTS.phoneNumber;
    await expect(handler(event)).rejects.toEqual(new Error(errorMessage));
    expect(mocks.sns.publish.mock.calls.length).toBe(1);
  });
  it('should reuse previous code if there are sessions', async () => {
    const code = '1234';
    event.request.session = [
      {
        publicChallengeParameters: null,
        privateChallengeParameters: { code },
        challengeMetadata: `CODE-${code}`
      }
    ];
    const sns = connectToSNS(true);
    mocks = {
      sns
    };
    jest.spyOn(mocks.sns, 'publish');
    const eventResponse = await handler(event);

    expect(mocks.sns.publish.mock.calls.length).toBe(0);
    expect(eventResponse.response.privateChallengeParameters).toEqual({ code: code });
    expect(eventResponse.response.challengeMetadata).toBe(`CODE-${code}`);
  });
});
