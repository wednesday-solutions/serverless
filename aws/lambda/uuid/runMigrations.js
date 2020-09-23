

async function migrate(serverless) {
    const getHost = require('./getHost')
    try {
        console.log('migrate');
      const host = await getHost(serverless);

      if (host) {
          return `npx sls migrations up --stage=${serverless.variables.options.stage} --host=${host}`;
      }

    } catch (e) {
        serverless.cli.log('Migration failed.');
        serverless.cli.log(e);
    }
    return '';
}

module.exports = migrate
