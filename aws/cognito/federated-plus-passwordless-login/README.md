# AWS Cognito Federated Sign in

Authorize and authenticate users with Facebook/Google/LoginWithAmazon through Cognito. 

## Sign up
```
Amplify.configure({
  Auth: {
    region: <aws-region>,
    userPoolId: <cognito-user-pool-id>,
    userPoolWebClientId: <cognito-user-pool-webclient-id>,
    oauth: {
      responseType: 'token',
      domain: <hosted-ui>,
      scope: ['email'],
      redirectSignIn: <redirect-uri>, // this should match the Cognito Callback URL(s)
      redirectSignOut: <logout-uri> // this should match the Cognito Sign out URL
    }
  }
});
Auth.federatedSignIn({ provider: 'Facebook' })}
Auth.federatedSignIn({ provider: 'Google' })}
Auth.federatedSignIn({ provider: 'LoginWithAmazon' })}
```

## Update Phone number
```
user.getAttributeVerificationCode('phone_number', {
  onSuccess: async params => {
    console.log('params', params);
  },
  onFailure: err => {
    console.log({ err });
    // reject(err);
  },
  inputVerificationCode: data => {
    console.log({ data });
    // resolve();
  }
});
```
## Verify OTP
```
user.verifyAttribute('phone_number', "xxx", {
      onSuccess: data => {
        console.log({ data });
      },
      onFailure: err => {
        console.log({ err });
      }
    });
```
