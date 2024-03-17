#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const dirs = require("../utils/directories");
const files = require("../utils/files");
const mta = require("../utils/mta-files");
const ui5 = require("../utils/ui5");
const profiling = require("../utils/profiling");
const constants = require("../utils/constants");
const banner = require("node-banner");
const yargs = require("yargs");

const target = process.cwd();
const _availableModules = ["ui5","mta","profiling"];
let promises = [];
let _additionalModules = [];

let printEndMessage = function () {
  console.log("\n");
  console.log(
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
          console.log(`WARNING! Module ${el} is not available`);
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
  await banner("lorenzobigs", "Starting process...", "black");
  console.log("\n");

  await addModules();
  await dirs.create(target);

  //If additional modules are required add the function to the Promises array
  Promise.all([
    files.create(target),
    _additionalModules.includes('ui5')        ? ui5.create(target) : Promise.resolve(null),
    _additionalModules.includes('mta')        ? mta.create(target) : Promise.resolve(null),
    _additionalModules.includes('profiling')  ? profiling.create(target) : Promise.resolve(null),
  ]).then(() => {
    printEndMessage();
  });
};

//entry point
start();

module.exports = {
  start: start,
};
