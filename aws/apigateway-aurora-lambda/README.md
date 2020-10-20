# UUID
Write a backend that exposes an endpoint that whenever invoked generates a new UUID, writes that to the database and returns it to the calling client. The backend should also expose an API that accepts a UUID and updates the updated_at timestamp if its already present in the db, else inserts it.


## Rest APIs
Use API Gateway to expose a backend that provides
- a GET request that returns a new UUID when invoked and writes the value to a mysql variant of Aurora DB
- a PUT request that accepts a UUID, updates the updated_at timestamp if its already present in the db, else inserts it.

## Migrations

Migrations are handled using sequelize. After a successful deployment a migration script is triggered by executing the following command: 
`sls migrations up --host=<host> --stage=<stage>`

The host URL is fetched by querying the cloudformation Output for the RDSHost. 
