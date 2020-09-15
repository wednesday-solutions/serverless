exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event));

  // If user is not registered
  if (event.request.userNotFound) {
    event.response.issueToken = false;
    event.response.failAuthentication = true;
    throw new Error('User does not exist');
  }

  if (event.request.session.length >= 3 && event.request.session.slice(-1)[0].challengeResult === false) {
    // wrong OTP even After 3 sessions?
    event.response.issueToken = false;
    event.response.failAuthentication = true;
    throw new Error('Invalid OTP');
  } else if (event.request.session.length > 0 && event.request.session.slice(-1)[0].challengeResult === true) {
    // Correct OTP!
    event.response.issueTokens = true;
    event.response.failAuthentication = false;
  } else {
    // not yet received correct OTP
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = 'CUSTOM_CHALLENGE';
  }

  return event;
};
