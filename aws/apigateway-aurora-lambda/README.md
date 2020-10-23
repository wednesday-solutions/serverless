<img align="left" src="./apigateway_logo.svg" width="480" height="520" />

<div>
  <a href="https://www.wednesday.is?utm_source=gthb&utm_medium=repo&utm_campaign=serverless" align="left"><img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f5879492fafecdb3e5b0e75_wednesday_logo.svg"></a>
  <p>
    <h1 align="left">UUID</h1>
  </p>
  <p>
  Write a backend that exposes an endpoint that whenever invoked generates a new UUID, writes that to the database and returns it to the calling client. The  backend should also expose an API that accepts a UUID and updates the updated_at timestamp if its already present in the db, else inserts it.
  </p>

  ___


  <p>
    <h4>
      Expert teams of digital product strategists, developers, and designers. 
    </h4>
  </p>

  <div>
    <a href="https://www.wednesday.is/contact-us?utm_source=gthb&utm_medium=repo&utm_campaign=serverless" target="_blank">
      <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f6ae88b9005f9ed382fb2a5_button_get_in_touch.svg" width="121" height="34">
    </a>
    <a href="https://github.com/wednesday-solutions/" target="_blank">
      <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f6ae88bb1958c3253756c39_button_follow_on_github.svg" width="168" height="34">
    </a>
  </div>

  ___

  <span>We’re always looking for people who value their work, so come and join us. <a href="https://www.wednesday.is/hiring">We are hiring!</a></span>
</div>

## Rest APIs
Use API Gateway to expose a backend that provides
- a GET request that returns a new UUID when invoked and writes the value to a mysql variant of Aurora DB
- a PUT request that accepts a UUID, updates the updated_at timestamp if its already present in the db, else inserts it.

## Migrations

Migrations are handled using sequelize. After a successful deployment a migration script is triggered by executing the following command: 
`sls migrations up --host=<host> --stage=<stage>`

The host URL is fetched by querying the cloudformation Output for the RDSHost. 
