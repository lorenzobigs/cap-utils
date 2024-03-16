const fs = require('fs');
const path = require('path');
const constants = require('./constants');

let createDataDirectory = function (target) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(target, constants.DB_FOLDER, constants.DB_DATA_FOLDER), () => {
            console.log(`Directory ${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER} created`);
            resolve();
        })
    })
    
}

let createDbDirectory = function (target) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(target, constants.DB_FOLDER), () => {
            console.log(`Directory ${constants.DB_FOLDER} created`);
            resolve();
        })
    })
    
}

let createSrvDirectory = function (target) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(target, constants.SRV_FOLDER), () => {
            console.log(`Directory ${constants.SRV_FOLDER} created`);
            resolve();
        })
    })
    
}

let createdirs = function (target) {
    return new Promise(async (resolve, reject) => {
        let dbdir = fs.existsSync(path.join(target, constants.DB_FOLDER));
        let srvdir = fs.existsSync(path.join(target, constants.SRV_FOLDER));
        if (dbdir) {
            console.log(`Directory ${constants.DB_FOLDER} exists, skipping creation`);
            let dbdatadir = fs.existsSync(path.join(target, constants.DB_FOLDER, constants.DB_DATA_FOLDER));
            if (dbdatadir) {
                console.log(`Directory ${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER} exists, skipping creation`);
            } else {
                console.log(`Creating directory ${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER}...`)
                await createDataDirectory(target);
            }
        } else {
            console.log(`Creating directory ${constants.DB_FOLDER}`);
            await createDbDirectory(target);
            console.log(`Creating directory ${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER}...`)
            await createDataDirectory(target);
        }

        if (srvdir) {
            console.log(`Directory ${constants.SRV_FOLDER} exists, skipping creation`);
        } else {
            console.log(`Creating directory ${constants.SRV_FOLDER}`);
            await createSrvDirectory(target);
        }
        resolve();
    });
}

module.exports = {
    create: createdirs
};

