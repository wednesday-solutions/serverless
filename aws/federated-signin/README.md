# AWS Cognito Federated Sign in

Authorize and authenticate users with Facebook/Google/LoginWithAmazon through Cognito. 

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
