const { create } = require('domain');
const fs = require('fs');
const path = require('path');
const constants = require('./constants');

let writedatamodel = function (target) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '..', constants.DB_FOLDER, constants.DB_CDS), 'utf-8', (err, data) => {
            fs.writeFile(path.join(target, constants.DB_FOLDER, constants.DB_CDS), data, (err) => {
                if (err) console.error(err);
                console.log(`/${constants.DB_FOLDER}/${constants.DB_CDS} created`)
                resolve();
            })
        })
    })

}

let writedatabooks = function (target) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '..', constants.DB_FOLDER, constants.DB_DATA_FOLDER, constants.BOOKS_CSV), 'utf-8', (err, data) => {
            fs.writeFile(path.join(target, constants.DB_FOLDER, constants.DB_DATA_FOLDER, constants.BOOKS_CSV), data, (err) => {
                if (err) console.error(err);
                console.log(`/${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER}/${constants.BOOKS_CSV} created`)
                resolve();
            })
        })
    })
}

let writedataauthors = function (target) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '..', constants.DB_FOLDER, constants.DB_DATA_FOLDER, constants.AUTHORS_CSV), 'utf-8', (err, data) => {
            fs.writeFile(path.join(target, constants.DB_FOLDER, constants.DB_DATA_FOLDER, constants.AUTHORS_CSV), data, (err) => {
                if (err) console.error(err);
                console.log(`/${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER}/${constants.AUTHORS_CSV} created`)
                resolve();
            })
        })
    })
}

let writesrv = function (target) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '..', constants.SRV_FOLDER, constants.SERVICE_CDS), 'utf-8', (err, data) => {
            fs.writeFile(path.join(target, constants.SRV_FOLDER, constants.SERVICE_CDS), data, (err) => {
                if (err) console.error(err);
                console.log(`/${constants.SRV_FOLDER}/${constants.SERVICE_CDS} created`)
                resolve();
            })
        })
    })

}

let writehttptest = function (target) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '..', constants.HTTP_TEST_FILE), 'utf-8', (err, data) => {
            fs.writeFile(path.join(target, constants.HTTP_TEST_FILE), data, (err) => {
                if (err) console.error(err);
                console.log(`/${constants.HTTP_TEST_FILE} created`)
                resolve();
            })
        })
    })

}


let writepackage = function (target) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '..', constants.PACKAGE_CAP), 'utf-8', (err, data) => {
            fs.writeFile(path.join(target, constants.PACKAGE_CAP), data, (err) => {
                if (err) console.error(err);
                console.log(`/${constants.PACKAGE_CAP} created`)
                resolve();
            })
        })
    })

}

let createFiles = async function (target) {
    return new Promise(async (resolve, reject) => {
        Promise.all([
            writedatamodel(target),
            writedatabooks(target),
            writedataauthors(target),
            writesrv(target),
            writehttptest(target),
            writepackage(target)
        ]).then(() => {
            resolve()
        });
        
    })

}

module.exports = {
    create: createFiles
}