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

let writedatabooks = function (target) {
    return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname,'..','db','data','my.validexample-Books.csv'), 'utf-8', (err, data) => {
        fs.writeFile(path.join(target, 'db','data','my.validexample-Books.csv'), data, (err) =>{
            if(err) console.error(err);
            console.log('/db/data/my.validexample-Books.csv created')
            resolve();
        })
    })
    })
}

let writedataauthors = function (target) {
    return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname,'..','db','data','my.validexample-Authors.csv'), 'utf-8', (err, data) => {
        fs.writeFile(path.join(target, 'db','data','my.validexample-Authors.csv'), data, (err) =>{
            if(err) console.error(err);
            console.log('/db/data/my.validexample-Authors.csv created')
            resolve();
        })
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
        fs.readFile(path.join(__dirname,'..','test.http'), 'utf-8', (err, data) => {
            fs.writeFile(path.join(target, 'test.http'), data, (err) =>{
                if(err) console.error(err);
                console.log('/test.http created')
                resolve();
            })
        })
    })
   
}

let createFiles = async function(target){
    return new Promise(async (resolve,reject) => {
        await writedatamodel(target);
        await writedatabooks(target);
        await writedataauthors(target);
        await writesrv(target);
        await writehttptest(target);
        resolve();
    })
    
}

module.exports = {
    create : createFiles
}