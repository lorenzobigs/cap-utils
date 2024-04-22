const cds = require('@sap/cds');


/**
* Implementation for Nortwhind service defined in ./external-service.cds
*/
module.exports = async function () {

    let trip = await cds.connect.to('trip');


    this.on('READ', 'People', async (req) => {

        return await trip.run(req.query);

    });


    this.after('READ', 'People', async (data, req) => {
        data.forEach(element => {
            element.FirstName = element.FirstName + ' string added after read';

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
