exports.handler = async event => {
  console.log(JSON.stringify(event));

  const expectedAnswer = event.request.privateChallengeParameters.code;
  if (event.request.challengeAnswer === expectedAnswer) {
    event.response.answerCorrect = true;
  } else {
    event.response.answerCorrect = false;
  }

  return event;
};
