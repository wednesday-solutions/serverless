async function setDBEnvironment(serverless) {
  return {
    DB_DIALECT: 'mysql',
    DB_NAME: `uuids_${process.env.RDS_PREFIX}_${process.env.STAGE}`,
    DB_USERNAME: `${process.env.RDS_USERNAME}_${process.env.STAGE}`,
    DB_PASSWORD: `${process.env.DB_PASSWORD}`,
    DB_PORT: `${process.env.DB_PORT}`
  };
}
module.exports.env = setDBEnvironment;
