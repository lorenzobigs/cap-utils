const fs = require('fs-extra');

let createApp = async function (target) {
    return new Promise(async (resolve, reject) => {
        try {
            // Verifica se la cartella di destinazione esiste, altrimenti creala
            await fs.ensureDir(target);
        
            // Copia la cartella sorgente nella cartella di destinazione
            await fs.copy('../app', target);
        
            console.log('Copia completata con successo!');
            resolve();
          } catch (err) {
            console.error('Errore durante la copia:', err);
            reject(err);
          }
    })
  
}

module.exports = {
    create : createApp
}