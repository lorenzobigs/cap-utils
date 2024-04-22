const fs = require('fs');
const path = require('path');
const editJsonFile = require("edit-json-file");
const pino = require('pino');
const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
});

const constants = require('./constants');

let modifyPackage = function (target) {
    let package = fs.existsSync(path.join(target, constants.PACKAGE));
    let targetPackage = editJsonFile(path.join(target, constants.PACKAGE),{
        autosave: true
    });

    if (package) {
        return new Promise((resolve, reject) => {
            getProfiles().then( (profiles) => {
                targetPackage.set('cds.requires.[production]',profiles[0]);
                targetPackage.set('cds.requires.[development]',profiles[1]);
                targetPackage.set('cds.requires.[hybrid]',profiles[2]);
                logger.info(`${constants.PROFILING_MODULE} - Profiles added in /${constants.PACKAGE}`);
                resolve();
            })
        })
    } else {
        logger.warn(`${constants.PROFILING_MODULE} - /${constants.PACKAGE} does not exist, please initialize a CAP Project`);
    }

}

let getProfiles = function() {
    return new Promise(async (resolve, reject) => {
        let profiles = [];
        let sourcePackage = editJsonFile(path.join(__dirname, '..', constants.PACKAGE_CAP));
        let prodProfile = await sourcePackage.get('cds.requires.[production]');
        let developmentProfile = await sourcePackage.get('cds.requires.[development]');
        let hybridProfile = await sourcePackage.get('cds.requires.[hybrid]');
        profiles.push(prodProfile,developmentProfile,hybridProfile);
        resolve(profiles);
    })
}

let createFiles = async function (target) {
    return new Promise(async (resolve, reject) => {
        Promise.all([
            modifyPackage(target)
        ]).then(() => {
            resolve()
        });

    })

}

module.exports = {
    create: createFiles
}