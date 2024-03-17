const fs = require('fs-extra');
const path = require('path');
const pino = require('pino');
const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
});

const constants = require('./constants');

let createApp = async function (target) {
    return new Promise(async (resolve, reject) => {
        try {
            logger.info(`Copying ${constants.APP_FOLDER} folder and its content...`);

            await fs.ensureDir(path.join(target,constants.APP_FOLDER));

            await fs.copy(
                            path.join(__dirname, '..',constants.APP_FOLDER), 
                            path.join(target,constants.APP_FOLDER)
                        );
        
            logger.info(`Folder ${constants.APP_FOLDER} and its content copied`);
            resolve();
          } catch (err) {
            logger.error('Error during folder copy:', err);
            reject(err);
          }
    })
  
}

module.exports = {
    create : createApp
}