const fs = require('fs');
const path = require('path');

let createDataDirectory = function (target) {
    fs.mkdir(path.join(target, 'db', 'data'), () => {
        console.log(`Directory db/data created`);
    })
}

let createDbDirectory = function (target) {
    fs.mkdir(path.join(target, 'db'), () => {
        console.log(`Directory db created`);
    })
}

let createSrvDirectory = function (target) {
    fs.mkdir(path.join(target, 'srv'), () => {
        console.log(`Directory srv created`);
    })
}

let createdirs = function (target) {
    return new Promise((resolve, reject) => {
        let dbdir = fs.existsSync(path.join(target, 'db'));
        let srvdir = fs.existsSync(path.join(target, 'srv'));
        if (dbdir) {
            console.log(`Directory db exist, skipping creation`);
            let dbdatadir = fs.existsSync(path.join(target, 'db', 'data'));
            if (dbdatadir) {
                console.log(`Directory db/data exist, skipping creation`);
            } else {
                console.log(`Creating directory db/data..`)
                createDataDirectory(target);
            }
        } else {
            console.log(`Creating directory db`);
            createDbDirectory(target);
            console.log(`Creating directory db/data..`)
            createDataDirectory(target);
        }

        if (srvdir) {
            console.log(`Directory srv exist, skipping creation`);
        } else {
            console.log(`Creating directory srv`);
            createSrvDirectory(target);
        }
        resolve();
    });
}

module.exports = {
    create: createdirs
};

