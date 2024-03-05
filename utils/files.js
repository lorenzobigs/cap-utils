const { create } = require('domain');
const fs = require('fs');
const path = require('path');

let writedatamodel = function (target) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname,'..','db','cap-valid-data-model.cds'), 'utf-8', (err, data) => {
            fs.writeFile(path.join(target, 'db','cap-valid-data-model.cds'), data, (err) =>{
                if(err) console.error(err);
                console.log('/db/cap-valid-data-model.cds created')
                resolve();
            })
        })
    })
   
}

let writedatamock = function (target) {
    fs.readFile(path.join(__dirname,'..','db','data','my.validexample-Foo.csv'), 'utf-8', (err, data) => {
        fs.writeFile(path.join(target, 'db','data','my.validexample-Foo.csv'), data, (err) =>{
            if(err) console.error(err);
            console.log('/db/data/my.validexample-Foo.csv created')
        })
    })
}

let writesrv = function (target) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname,'..','srv','valid-service.cds'), 'utf-8', (err, data) => {
            fs.writeFile(path.join(target, 'srv','valid-service.cds'), data, (err) =>{
                if(err) console.error(err);
                console.log('/srv/valid-service.cds created')
                resolve();
            })
        })
    })
    
}

let writehttptest = function (target) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname,'..','validator-test.http'), 'utf-8', (err, data) => {
            fs.writeFile(path.join(target, 'validator-test.http'), data, (err) =>{
                if(err) console.error(err);
                console.log('/validator-test.http created')
                resolve();
            })
        })
    })
   
}

let createFiles = async function(target){
    return new Promise(async (resolve,reject) => {
        await writedatamodel(target);
        await writedatamock(target);
        await writesrv(target);
        await writehttptest(target);
        resolve();
    })
    
}

module.exports = {
    create : createFiles
}