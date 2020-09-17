# AWS Cognito using email/password

```
const config = {
  region: <aws-region>,
  userPoolId: <cognito-user-pool-id>,
  userPoolWebClientId: <cognito-user-pool-webclient-id>,

  email: <email-address>,
  password: <password>,
  phoneNumber: "+919049731761"
};


function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

Auth.signUp({
  username: config.email,
  password: config.password,
  attributes: {
    email: config.email,
  },
})
  .then(async (user) => {
    console.log(user);
    const OTP = await askQuestion("Please enter the email OTP\n");
    await user.user.confirmRegistration(OTP, false, (err, data) => {
      console.log({ err, data });
    });
  })
  .catch((e) => {
    console.log({ e });
  });
  


```
