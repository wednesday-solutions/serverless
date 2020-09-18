import { handler } from '../index';
import { CONSTANTS } from '@mocks/constants';

describe('cognito-triggers/verify-auth-challenge', () => {
  let event;
  beforeEach(() => {
    event = require('../data.json');
  });
  it('should return response.answerCorrect = true when the codes match', async () => {
    event.request.privateChallengeParameters.code = CONSTANTS.code;
    event.request.challengeAnswer = CONSTANTS.code;
    const eventResponse = await handler(event);
    expect(eventResponse.response.answerCorrect).toBe(true);
  });

  it("should return response.answerCorrect = false when the codes don't match", async () => {
    event.request.privateChallengeParameters.code = CONSTANTS.code;
    event.request.challengeAnswer = '1234';
    const eventResponse = await handler(event);
    expect(eventResponse.response.answerCorrect).toBe(false);
  });
});
