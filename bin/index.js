#! /usr/bin/env node
//internal
const dirs = require("../utils/directories");
const files = require("../utils/files");
const mta = require("../utils/mta-files");
const ui5 = require("../utils/ui5");
const ext = require("../utils/external");
const test = require("../utils/test");
const profiling = require("../utils/profiling");
const constants = require("../utils/constants");
//external libraries
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty'
  },
})

const target = process.cwd();
const _availableModules = ["ui5", "mta", "profiling", "ext", "test"];
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
  require('simple-banner').set("CAP Utilities - @on1zuka", "", 0);

  try {
    await addModules();
    await dirs.create(target);
    await files.create(target);

    //If additional modules are required add the function to the Promises array
    await Promise.all([

      _additionalModules.includes('ui5')        ? ui5.create(target) : Promise.resolve(null),
      _additionalModules.includes('mta')        ? mta.create(target) : Promise.resolve(null),
      _additionalModules.includes('profiling')  ? profiling.create(target) : Promise.resolve(null),
      _additionalModules.includes('ext')        ? ext.create(target) : Promise.resolve(null),
      _additionalModules.includes('test')       ? test.create(target) : Promise.resolve(null),
    ]);
  } catch (error) {
    logger.error('Error creating modules', error);
  }

  printEndMessage();

};

//entry point
start();

module.exports = {
  start: start,
};
