#! /usr/bin/env node
//internal
const dirs = require("../utils/directories");
const files = require("../utils/files");
const mta = require("../utils/mta-files");
const ui5 = require("../utils/ui5");
const profiling = require("../utils/profiling");
const constants = require("../utils/constants");
//external libraries
const fs = require("fs");
const path = require("path");
//const banner = require("node-banner");
const yargs = require("yargs");
const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty'
  },
})

const target = process.cwd();
const _availableModules = ["ui5","mta","profiling"];
let promises = [];
let _additionalModules = [];

let printEndMessage = function () {
  logger.info(
    `Great! Use cds watch and ${constants.HTTP_TEST_FILE} ${constants.END_MESSAGE}`
  );
};

/**
 *  Check if there are additional modules to be added 
 */
let addModules = function () {
  return new Promise((resolve, reject) => {
    let add_args = yargs.argv.add;

    if (add_args) {
      add_args.split(',').forEach((el) => {
        if (!_availableModules.includes(el)) {
          logger.warn(`Module ${el} is not available`);
        } else {
            _additionalModules.push(el);
        }
      });
    } else {
    }

    resolve();
  });
};


let start = async function () {
  //await banner("on1zuka", "Starting process...", "black");
  require('simple-banner').set("CAP Utilities - @on1zuka","",0);

  await addModules();
  await dirs.create(target);

  //If additional modules are required add the function to the Promises array
  Promise.all([
    files.create(target),
    _additionalModules.includes('ui5')        ? ui5.create(target) : Promise.resolve(null),
    _additionalModules.includes('mta')        ? mta.create(target) : Promise.resolve(null),
    _additionalModules.includes('profiling')  ? profiling.create(target) : Promise.resolve(null),
  ]).then(() => {
    setTimeout(printEndMessage,1000);
  });
};

//entry point
start();

module.exports = {
  start: start,
};
