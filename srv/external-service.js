const cds = require('@sap/cds');


/**
* Implementation for Nortwhind service defined in ./external-service.cds
*/
module.exports = async function () {

    let nw = await cds.connect.to('nw');


    this.on('READ', 'Categories', async (req) => {

        return await nw.run(req.query);

    });


    this.after('READ', 'Categories', async (data, req) => {
        data.forEach(element => {
            element.Description = element.Description + ' after read';

        });
    });

    /**
     * The generic error handler which catch all the errors thrown by the handlers
     */
    this.on('error', (err, req) => {

        console.log(err);

        //example of how you can customize error messages
        /*
        err.code = 'random';
        err.message = 'oh nooooooo';
        err.target = 'target';
        err.status = 400
        */
    })
};
