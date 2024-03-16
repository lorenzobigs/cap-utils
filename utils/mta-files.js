const fs = require('fs');
const path = require('path');
const constants = require('./constants');

let writexssec = function (target) {
    let xssec = fs.existsSync(path.join(target, constants.XS_SECURITY));
    if(!xssec){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.XS_SECURITY), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.XS_SECURITY), data, (err) => {
                    if (err) console.error(err);
                    console.log(`/${constants.XS_SECURITY} created`)
                    resolve();
                })
            })
        })
    } else {
        console.log(`/${constants.XS_SECURITY} exists, skipping creation`)
    }
    

}

let writexssec_cc = function (target) {

    let xssec_cc = fs.existsSync(path.join(target, constants.XS_SECURITY_CC));

    if(!xssec_cc){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.XS_SECURITY_CC), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.XS_SECURITY_CC), data, (err) => {
                    if (err) console.error(err);
                    console.log(`/${constants.XS_SECURITY_CC} created`)
                    resolve();
                })
            })
        })
    } else{
        console.log(`/${constants.XS_SECURITY_CC} exists, skipping creation`)
    }


}


let createFiles = async function (target) {
    return new Promise(async (resolve, reject) => {
        Promise.all([
            writexssec(target),
            writexssec_cc(target)
        ]).then(() => {
            resolve()
        });
        
    })

}

module.exports = {
    create: createFiles
}