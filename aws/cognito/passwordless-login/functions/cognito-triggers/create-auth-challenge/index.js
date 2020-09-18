import { sendSMS } from '@services/sns';

exports.handler = async event => {
  console.log(JSON.stringify(event));

  console.log('CUSTOM_CHALLENGE_LAMBDA', event.request);

  let code;
  if (!event.request.session || !event.request.session.length) {
    // Generate a new secret login code and send it to the user
    code = Date.now()
      .toString()
      .slice(-4);
    try {
      await sendSMS(
        event.request.userAttributes.phone_number,
        `Use the following OTP: ${code} to login to the Wednesday Application`
      );
    } catch {
      throw new Error(`Failed to send SMS`);
    }
  } else {
    // re-use code generated in previous challenge
    const previousChallenge = event.request.session.slice(-1)[0];
    code = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
  }

  console.log(event.request.userAttributes);

  // Add the secret login code to the private challenge parameters
  // so it can be verified by the "Verify Auth Challenge Response" trigger
  event.response.privateChallengeParameters = { code };

  // Add the secret login code to the session so it is available
  // in a next invocation of the "Create Auth Challenge" trigger
  event.response.challengeMetadata = `CODE-${code}`;

  return event;
};
