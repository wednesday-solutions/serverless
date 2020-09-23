# UUID

Use API Gateway to expose lambdas that 
- a GET request that returns a new UUID when invoked and writes the value to an mysql variant of Aurora DB
- a PUT request that accepts a UUID, updates the updated_at timestamp if its already present in the db, else inserts it.


