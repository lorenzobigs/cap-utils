const fs = require('fs');
const path = require('path');
const editJsonFile = require("edit-json-file");
const constants = require('./constants');


let modifyPackage = function (target) {
    let package = fs.existsSync(path.join(target, constants.PACKAGE));
    let targetPackage = editJsonFile(path.join(target, constants.PACKAGE),{
        autosave: true
    });

    if (targetPackage.get('name')) {
        return new Promise((resolve, reject) => {
            getProfiles().then( (profiles) => {
                targetPackage.set('cds.requires.[production]',profiles[0]);
                targetPackage.set('cds.requires.[local]',profiles[1]);
                console.log(`Profiles added in /${constants.PACKAGE}`);
                resolve();
            })
        })
    } else {
        console.log(`[WARNING] - /${constants.PACKAGE} does not exist, please initialize a CAP Project`);
    }

}

let getProfiles = function() {
    return new Promise(async (resolve, reject) => {
        let profiles = [];
        let sourcePackage = editJsonFile(path.join(__dirname, '..', constants.PACKAGE_CAP));
        let prodProfile = await sourcePackage.get('cds.requires.[production]');
        let localProfile = await sourcePackage.get('cds.requires.[local]');
        profiles.push(prodProfile,localProfile);
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