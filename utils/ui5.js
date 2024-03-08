const fs = require('fs-extra');
const path = require('path');
const constants = require('./constants');

let createApp = async function (target) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`Copying ${constants.APP_FOLDER} folder and its content...`);

            await fs.ensureDir(path.join(target,constants.APP_FOLDER));

            await fs.copy(
                            path.join(__dirname, '..',constants.APP_FOLDER), 
                            path.join(target,constants.APP_FOLDER)
                        );
        
            console.log(`Folder ${constants.APP_FOLDER} and its content copied`);
            resolve();
          } catch (err) {
            console.error('Error during folder copy:', err);
            reject(err);
          }
    })
  
}

module.exports = {
    create : createApp
}