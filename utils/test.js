const fs = require('fs');
const path = require('path');

let createTestFile = function(target){
    fs.writeFile(path.join(target, 'db','cap-valid-data-model.cds'), 'test', (err) =>{
        if(err) console.error(err);
    })
}
let createTestDir = function(target) {
    fs.mkdir(path.join(target, 'db'), () => {
        console.log(`Directory db/data created`);
    })
}
module.exports = {
    createFile : createTestFile,
    createDir : createTestDir
}