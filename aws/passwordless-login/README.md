# Passwordless Login

## sign up
```
global.fetch = require('node-fetch').default;
const Amplify = require('aws-amplify').default;
const Auth = Amplify.Auth;
const readline = require('readline');

const config = {
  region: 'xxx',
  userPoolId: 'xxx',
  userPoolWebClientId: 'xxx',

  email: 'mac@wednesday.is',
  phoneNumber: 'xxx'
};

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close();
      resolve(ans);
    })
  );
}

Auth.signUp({
  username: config.phoneNumber,
  password: 'xxx'
}).then(async user => {
    const OTP = await askQuestion('Please enter the phone OTP\n');
    await user.user.confirmRegistration(OTP, false, (err, data) => {
      console.log({ err, data });
    });
  }).catch(e => {
    console.log({ e });
  });
```

## sign in

```
global.fetch = require('node-fetch').default;
const Amplify = require('aws-amplify').default;
const Auth = Amplify.Auth;
const readline = require('readline');

const config = {
  region: 'xxx',
  userPoolId: 'xxx',
  userPoolWebClientId: 'xxx',

  email: 'mac@wednesday.is',
  phoneNumber: 'xxx'
};
Auth.signIn(config.phoneNumber)
    .then(async (user) => {
      const OTP = await askQuestion("Please enter the OTP:\n");
      const cognitoUser = await Auth.sendCustomChallengeAnswer(user, OTP);
      return cognitoUser;
    })
    .then((user) => {
      console.log({
        user,
      });
      user.getSession((err, data) => {
        console.log({ err, data });
      });
    })
    .catch((err) => console.log(err));
```