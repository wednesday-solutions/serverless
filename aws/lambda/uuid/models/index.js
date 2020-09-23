const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const SequelizeMock = require('sequelize-mock');

function getDB() {
    let sequelize;
    if (process.env.NODE_ENV === 'test') {
        sequelize = new SequelizeMock();
    } else {
        sequelize = new Sequelize(`${process.env.DB_DIALECT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
            host: process.env.DB_HOST,
            logging: true,
            dialect: process.env.DB_DIALECT,
            pool: {
                min: 0,
                max: 10,
                idle: 10000
            },
            define: {
                userscored: true,
                timestamps: false
            }
        });
    }

    const dirName = path.join(process.cwd(), './models');
    fs.readdirSync(dirName)
        .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
        .forEach(file => {
            try {
                const model = sequelize.import(path.join(`${process.cwd()}/models/`, file));
                db[model.name] = model;
            } catch (e) {
                console.log({ e });
            }
        });

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    return db
}

module.exports = {getDB};
