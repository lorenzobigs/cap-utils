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

let createTestFolder = function(target){
    return new Promise(async (resolve, reject) => {
        try {
            logger.info(`${constants.TEST_MODULE} - Copying ${constants.TEST_FOLDER} and its content...`);

            await fsExtra.ensureDir(path.join(target,constants.TEST_FOLDER));

            await fsExtra.copy(
                            path.join(__dirname, '..',constants.TEST_FOLDER), 
                            path.join(target,constants.TEST_FOLDER)
                        );
        
            logger.info(`${constants.TEST_MODULE} - Folder ${constants.TEST_FOLDER} and its content copied`);
            resolve();
          } catch (err) {
            logger.error(`${constants.TEST_MODULE} - Error during folder copy:`, err);
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
            let testScript = await sourcePackage.get('scripts.test');
            targetPackage.set('scripts.test', testScript);
            logger.info(`${constants.TEST_MODULE} - Test script added in /${constants.PACKAGE}`);
            logger.info(`${constants.TEST_MODULE} - Ensure that test devDependencies are installed`);
            logger.info(`${constants.TEST_MODULE} - You can run "${constants.TEST_DEPENDENCIES}"`);
            resolve();
        })
    } else {
        logger.warn(`${constants.TEST_MODULE} - /${constants.PACKAGE} does not exist, please initialize a CAP Project`);
    }

}




let createFiles = async function (target) {
    return new Promise(async (resolve, reject) => {

        await createTestFolder(target);

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