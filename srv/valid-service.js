const cds = require('@sap/cds');

module.exports = async function () {

    this.on('READ', 'UserAuthorizations', (req) => {

        return {
            user   : req.user.id,
            isAdmin: req.user.is('admin'),
            isUser:  req.user.is('user')
        };

        
    });


    /**
     * The generic error handler which catch all the errors thrown by the handlers
     */
    this.on('error', (err, req) => {

        console.log(err);

    })
};