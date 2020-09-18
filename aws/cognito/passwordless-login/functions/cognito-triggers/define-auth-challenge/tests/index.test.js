import { handler } from '../index';

describe('cognito-triggers/define-auth-challenge', () => {
  let event;
  beforeEach(() => {
    event = require('../data.json');
  });
  it('should throw an error if the user is not found', async () => {
    event.request.userNotFound = true;
    await expect(handler(event)).rejects.toEqual(new Error('User does not exist'));
  });
  it('should throw error if the OTP is wrong after 3 or more attempts', async () => {
    event.request.session = [
      {
        challengeResult: false
      },
      {
        challengeResult: false
      },
      {
        challengeResult: false
      }
    ];
    await expect(handler(event)).rejects.toEqual(new Error('Invalid OTP'));
  });
  it('should issue tokens if challenge result is true', async () => {
    event.request.session = [
      {
        challengeResult: false
      },
      {
        challengeResult: false
      },
      {
        challengeResult: true
      }
    ];
    const eventResponse = await handler(event);
    expect(eventResponse.response.issueTokens).toBe(true);
    expect(eventResponse.response.failAuthentication).toBe(false);
  });

  it('should not issueTokens if session.length is 0 ', async () => {
    const eventResponse = await handler(event);
    expect(eventResponse.response.issueTokens).toBe(false);
    expect(eventResponse.response.failAuthentication).toBe(false);
    expect(eventResponse.response.challengeName).toBe('CUSTOM_CHALLENGE');
  });
});
