const fs = require('fs');
const path = require('path');
const pino = require('pino');
const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
});

const constants = require('./constants');

let createDataDirectory = function (target) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(target, constants.DB_FOLDER, constants.DB_DATA_FOLDER), () => {
            logger.info(`Directory ${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER} created`);
            resolve();
        })
    })
    
}

let createDbDirectory = function (target) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(target, constants.DB_FOLDER), () => {
            logger.info(`Directory ${constants.DB_FOLDER} created`);
            resolve();
        })
    })
    
}

let createSrvDirectory = function (target) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(target, constants.SRV_FOLDER), () => {
            logger.info(`Directory ${constants.SRV_FOLDER} created`);
            resolve();
        })
    })
    
}

let createdirs = function (target) {
    return new Promise(async (resolve, reject) => {
        let dbdir = fs.existsSync(path.join(target, constants.DB_FOLDER));
        let srvdir = fs.existsSync(path.join(target, constants.SRV_FOLDER));
        if (dbdir) {
            logger.info(`Directory ${constants.DB_FOLDER} exists, skipping creation`);
            let dbdatadir = fs.existsSync(path.join(target, constants.DB_FOLDER, constants.DB_DATA_FOLDER));
            if (dbdatadir) {
                logger.info(`Directory ${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER} exists, skipping creation`);
            } else {
                logger.info(`Creating directory ${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER}...`)
                await createDataDirectory(target);
            }
        } else {
            logger.info(`Creating directory ${constants.DB_FOLDER}`);
            await createDbDirectory(target);
            logger.info(`Creating directory ${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER}...`)
            await createDataDirectory(target);
        }

        if (srvdir) {
            logger.info(`Directory ${constants.SRV_FOLDER} exists, skipping creation`);
        } else {
            logger.info(`Creating directory ${constants.SRV_FOLDER}`);
            await createSrvDirectory(target);
        }
        resolve();
    });
}

module.exports = {
    create: createdirs
};

