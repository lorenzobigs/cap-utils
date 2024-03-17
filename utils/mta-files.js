const fs = require('fs');
const path = require('path');
const pino = require('pino');
const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
});

const constants = require('./constants');

const project_name = path.basename(process.cwd());

let writenewmta = function (target) {
    let mta = fs.existsSync(path.join(target, constants.MTA));
    if (!mta) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.MTA), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.MTA), data.replace(/demo/g, project_name), (err) => {
                    if (err) console.error(err);
                    logger.info(`/${constants.MTA} created`)
                    resolve();
                })
            })
        })
    } else {
        logger.info(`/${constants.MTA} exists, skipping creation`)
    }

}

let writexssec = function (target) {
    let xssec = fs.existsSync(path.join(target, constants.XS_SECURITY));
    if (!xssec) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.XS_SECURITY), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.XS_SECURITY), data.replace(/demo/g, project_name), (err) => {
                    if (err) console.error(err);
                    logger.info(`/${constants.XS_SECURITY} created`)
                    resolve();
                })
            })
        })
    } else {
        logger.info(`/${constants.XS_SECURITY} exists, skipping creation`)
    }


}

let writexssec_cc = function (target) {

    let xssec_cc = fs.existsSync(path.join(target, constants.XS_SECURITY_CC));

    if (!xssec_cc) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.XS_SECURITY_CC), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.XS_SECURITY_CC), data.replace(/demo/g, project_name), (err) => {
                    if (err) console.error(err);
                    logger.info(`/${constants.XS_SECURITY_CC} created`)
                    resolve();
                })
            })
        })
    } else {
        logger.info(`/${constants.XS_SECURITY_CC} exists, skipping creation`)
    }


}


let createFiles = async function (target) {
    return new Promise(async (resolve, reject) => {
        Promise.all([
            writexssec(target),
            writexssec_cc(target),
            writenewmta(target)
        ]).then(() => {
            resolve()
        });

    })

}

module.exports = {
    create: createFiles
}