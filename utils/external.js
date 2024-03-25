const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const editJsonFile = require("edit-json-file");
const pino = require('pino');
const logger = pino({
    transport: {
        target: 'pino-pretty'
    }
});

const constants = require('./constants');

let createExtFolder = function(target){
    return new Promise(async (resolve, reject) => {
        try {
            logger.info(`${constants.EXT_MODULE} - Copying ${constants.SRV_FOLDER}/${constants.SRV_EXT_FOLDER} and its content...`);

            await fsExtra.ensureDir(path.join(target,constants.SRV_FOLDER,constants.SRV_EXT_FOLDER));

            await fsExtra.copy(
                            path.join(__dirname, '..',constants.SRV_FOLDER,constants.SRV_EXT_FOLDER), 
                            path.join(target,constants.SRV_FOLDER,constants.SRV_EXT_FOLDER)
                        );
        
            logger.info(`${constants.EXT_MODULE} - Folder ${constants.SRV_FOLDER}/${constants.SRV_EXT_FOLDER} and its content copied`);
            resolve();
          } catch (err) {
            logger.error('${constants.EXT_MODULE} - Error during folder copy:', err);
            reject(err);
          }
    })
}

let modifyPackage = function (target) {
    let package = fs.existsSync(path.join(target, constants.PACKAGE));
    let targetPackage = editJsonFile(path.join(target, constants.PACKAGE), {
        autosave: true
    });

    if (package) {
        return new Promise(async (resolve, reject) => {
            let sourcePackage = editJsonFile(path.join(__dirname, '..', constants.PACKAGE_CAP));
            let nwSource = await sourcePackage.get('cds.requires.nw');
            targetPackage.set('cds.requires.nw', nwSource);
            logger.info(`${constants.EXT_MODULE} - External source nortwhind added in /${constants.PACKAGE}`);
            let sapHttpClient = await targetPackage.get(`dependencies.${constants.SAP_HTTP_CLIENT}`);
            if(!sapHttpClient) {
                logger.warn(`${constants.EXT_MODULE} - ${constants.SAP_HTTP_CLIENT} dependency is missing. It is needed to consume external services`);
            }
            resolve();
        })
    } else {
        logger.warn(`${constants.EXT_MODULE} - /${constants.PACKAGE} does not exist, please initialize a CAP Project`);
    }

}


let writeExtSrv = function (target) {

    let ext_srv_cds = fs.existsSync(path.join(target, constants.SRV_FOLDER, constants.EXT_SERVICE_CDS));

    if(!ext_srv_cds){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.SRV_FOLDER, constants.EXT_SERVICE_CDS), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.SRV_FOLDER, constants.EXT_SERVICE_CDS), data, (err) => {
                    if (err) console.error(err);
                    logger.info(`${constants.EXT_MODULE} - /${constants.SRV_FOLDER}/${constants.EXT_SERVICE_CDS} created`)
                    resolve();
                })
            })
        })
    } else {
        logger.info(`${constants.EXT_MODULE} - /${constants.SRV_FOLDER}/${constants.EXT_SERVICE_CDS} exists, skipping creation`)
    }
}

let writeExtSrvImpl = function (target) {

    let ext_srv_cds = fs.existsSync(path.join(target, constants.SRV_FOLDER, constants.EXT_SERVICE_JS));

    if(!ext_srv_cds){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.SRV_FOLDER, constants.EXT_SERVICE_JS), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.SRV_FOLDER, constants.EXT_SERVICE_JS), data, (err) => {
                    if (err) console.error(err);
                    logger.info(`${constants.EXT_MODULE} - /${constants.SRV_FOLDER}/${constants.EXT_SERVICE_JS} created`)
                    resolve();
                })
            })
        })
    } else {
        logger.info(`${constants.EXT_MODULE} - /${constants.SRV_FOLDER}/${constants.EXT_SERVICE_JS} exists, skipping creation`)
    }
}


let createFiles = async function (target) {
    return new Promise(async (resolve, reject) => {

        await createExtFolder(target);

        Promise.all([
            modifyPackage(target),
            writeExtSrv(target),
            writeExtSrvImpl(target)
        ]).then(() => {
            resolve()
        });

    })

}

module.exports = {
    create: createFiles
}