#! /usr/bin/env node
const fs= require('fs');
const path = require('path');
const dirs = require('../utils/directories');
const files = require('../utils/files');
const constants = require('../utils/constants');
const banner = require('node-banner');

let printEndMessage = function(){
    console.log('\n');
    console.log(`Great! Use cds watch and ${constants.HTTP_TEST_FILE} ${constants.END_MESSAGE}`);
}

let start = async function() {
    await banner('lorenzobigs','Starting process...','black');
    console.log('\n');
    Promise.all([
        dirs.create(process.cwd()),
        files.create(process.cwd())
    ]).then( () => {
        printEndMessage();
    })
   
   
}

start();

module.exports = {
    start : start
}





