#! /usr/bin/env node
const fs= require('fs');
const path = require('path');
const test = require('../utils/test');
const dirs = require('../utils/directory');
const files = require('../utils/files');
const banner = require('node-banner');

let start = async function() {
    await banner('lorenzobigs','Starting process...','black');
    console.log('\n');
    await dirs.create(process.cwd());
    await files.create(process.cwd());    
    console.log('\n');
    console.log('Great! Use cds watch and validator-test.http to explore the usage of SAP CAP validators');
}

start();

module.exports = {
    start : start
}





