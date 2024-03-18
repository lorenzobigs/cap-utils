const cds = require('@sap/cds');

/**
* Implementation for Nortwhind service defined in ./external-service.cds
*/
module.exports = cds.service.impl(async function() {

    const nw = await cds.connect.to('nw');

    this.on('READ', 'Categories', async req => {
        return nw.run(req.query);
    });

});
