async function setDBEnvironment(serverless) {

    const dotenv = require('dotenv')
    dotenv.config({path: `.env.${serverless.variables.options.stage}`})
    const DB_HOST = await require('./getHost')(serverless);
    return {
        DB_DIALECT: 'mysql',
        DB_NAME: `uuids_${process.env.RDS_PREFIX}_${process.env.STAGE}`,
        DB_HOST,
        DB_USERNAME: `${process.env.RDS_USERNAME}_${process.env.STAGE}`,
        DB_PASSWORD: `${process.env.DB_PASSWORD}`,
        DB_PORT: `${process.env.DB_PORT}`,
    }
}
module.exports = setDBEnvironment;