<img align="left" src="./apigateway_logo.svg" width="480" height="520" />

<div>
  <a href="https://www.wednesday.is?utm_source=gthb&utm_medium=repo&utm_campaign=serverless" align="left"><img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f5879492fafecdb3e5b0e75_wednesday_logo.svg"></a>
  <p>
    <h1 align="left">Offices and Employees</h1>
  </p>
  <p>
   Write a multi-tenant backend for a SAAS ERP solution which allows storage/retrieval/manipulation of offices and employee data. Employees can work in multiple offices and each office can have multiple employees.
  </p>

---

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

---

<span>We’re always looking for people who value their work, so come and join us. <a href="https://www.wednesday.is/hiring">We are hiring!</a></span>

</div>

## Rest APIs

Use API Gateway to expose a backend that provides

- a PUT request that writes the employee details to a mysql variant of Aurora DB
- a PUT request that writes the office details to a mysql variant of Aurora DB
- a GET request that queries the DB by employeeId and returns the employee info
- a GET request that queries the DB by officeId and returns the office info
- a PUT request that associates office with employee
- a GET request that queries the DB and returns the all the offices or all the offices of a particular employee with pagination support
- a GET request that queries the DB and returns the all the employees or all the employees of a particular office with pagination support

## Migrations

Migrations are handled using sequelize. After a successful deployment a migration script is triggered by executing the following command:
`sls migrations up --host=<host> --stage=<stage>`

The host URL is fetched by querying the cloudformation Output for the RDSHost.
