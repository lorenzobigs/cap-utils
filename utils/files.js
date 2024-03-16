const fs = require('fs');
const path = require('path');
const constants = require('./constants');

let writedatamodel = function (target) {

    let data_model = fs.existsSync(path.join(target, constants.DB_FOLDER, constants.DB_CDS));

    if(!data_model){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.DB_FOLDER, constants.DB_CDS), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.DB_FOLDER, constants.DB_CDS), data, (err) => {
                    if (err) console.error(err);
                    console.log(`/${constants.DB_FOLDER}/${constants.DB_CDS} created`)
                    resolve();
                })
            })
        })
    } else {
        console.log(`/${constants.DB_FOLDER}/${constants.DB_CDS} exists, skipping creation`)
    }
   

}

let writedatabooks = function (target) {

    let books = fs.existsSync(path.join(target, constants.DB_FOLDER, constants.DB_DATA_FOLDER, constants.BOOKS_CSV));

    if(!books){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.DB_FOLDER, constants.DB_DATA_FOLDER, constants.BOOKS_CSV), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.DB_FOLDER, constants.DB_DATA_FOLDER, constants.BOOKS_CSV), data, (err) => {
                    if (err) console.error(err);
                    console.log(`/${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER}/${constants.BOOKS_CSV} created`)
                    resolve();
                })
            })
        })
    } else {
        console.log(`/${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER}/${constants.BOOKS_CSV} exists, skipping creation`)
    }

    
}

let writedataauthors = function (target) {

    let authors = fs.existsSync(path.join(target, constants.DB_FOLDER, constants.DB_DATA_FOLDER, constants.AUTHORS_CSV));

    if(!authors){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.DB_FOLDER, constants.DB_DATA_FOLDER, constants.AUTHORS_CSV), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.DB_FOLDER, constants.DB_DATA_FOLDER, constants.AUTHORS_CSV), data, (err) => {
                    if (err) console.error(err);
                    console.log(`/${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER}/${constants.AUTHORS_CSV} created`)
                    resolve();
                })
            })
        })
    } else {
        console.log(`/${constants.DB_FOLDER}/${constants.DB_DATA_FOLDER}/${constants.AUTHORS_CSV} exists, skipping creation`)
    }

    
}

let writesrv = function (target) {

    let srv_cds = fs.existsSync(path.join(target, constants.SRV_FOLDER, constants.SERVICE_CDS));

    if(!srv_cds){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.SRV_FOLDER, constants.SERVICE_CDS), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.SRV_FOLDER, constants.SERVICE_CDS), data, (err) => {
                    if (err) console.error(err);
                    console.log(`/${constants.SRV_FOLDER}/${constants.SERVICE_CDS} created`)
                    resolve();
                })
            })
        })
    } else {
        console.log(`/${constants.SRV_FOLDER}/${constants.SERVICE_CDS} exists, skipping creation`)
    }



}

let writehttptest = function (target) {

    let http_test = fs.existsSync(path.join(target, constants.HTTP_TEST_FILE));

    if(!http_test){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.HTTP_TEST_FILE), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.HTTP_TEST_FILE), data, (err) => {
                    if (err) console.error(err);
                    console.log(`/${constants.HTTP_TEST_FILE} created`)
                    resolve();
                })
            })
        })
    } else{
        console.log(`/${constants.HTTP_TEST_FILE} exists, skipping creation`);
    }


}


let writepackage = function (target) {

    let package_cap = fs.existsSync(path.join(target, constants.PACKAGE_CAP));

    if(!package_cap){
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', constants.PACKAGE_CAP), 'utf-8', (err, data) => {
                fs.writeFile(path.join(target, constants.PACKAGE_CAP), data, (err) => {
                    if (err) console.error(err);
                    console.log(`/${constants.PACKAGE_CAP} created`)
                    resolve();
                })
            })
        })
    } else{
        console.log(`/${constants.PACKAGE_CAP} exists, skipping creation`)
    }

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