# Cognito

## SRP

A user can create an account using their email and password. Since email is added to the AutoVerifyAttributes, the user will receive an email with a verification code which allows them to confirm their account. 

## Passwordless Login

A user can create an account using their phone number and a password. Since the phone number is added to the AutoVerifyAttributes, the user will receive an SMS with a verification code which allows them to confirm their account. 

For subsequent logins the user can either enter the phone number password combination or perform a passwordless login. 

The passwordless login flow (CUSTOM_AUTH) is made possible by setting up the following cognito triggers that send the user an OTP to login and then verify the OTP
- Create Auth Challenge
- Define Auth Challenge
- Verify Auth Challenge

You could even accept an email or an arbitrary name as the username to create the account. 

This would entail one of the following additional configuration steps
1. Pass the phone_number as an attribute during sign up and then verify it.
2. Once the user is created, update the user attribute called phone_number, and then verify the phone number.


## Federated sign in

You will need to create apps on the respective identity providers that you want to integrate with. Using the `federatedSign` from amplify the user can register/login using his social identity(Google/Facebook/LoginWithAmazon). 


## Federated sign in with support for passwordless login.

You will need to create apps on the respective identity providers that you want to integrate with. Using the `federatedSign` from amplify the user can register/login using his social identity(Google/Facebook/LoginWithAmazon)

Once the user has been created, we need to add update and verify the phone_number user attribute.

Once the above is done the passwordless login flow (CUSTOM_AUTH) is made possible by setting up the following cognito triggers that send the user an OTP to login and then verify the OTP
- Create Auth Challenge
- Define Auth Challenge
- Verify Auth Challenge
