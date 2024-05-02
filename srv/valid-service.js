const cds = require('@sap/cds');

module.exports = async function () {

    this.on('READ', 'UserAuthorizations', (req) => {

        return {
            user   : req.user.id,
            isAdmin: req.user.is('admin'),
            isUser:  req.user.is('user')
        };

        
    });

    this.on('add', async (req) => {

        try {
           
            let query = INSERT.into(Events,{ 
                ID:   req.data.ID != null ? req.data.ID : randomUUID(),
                name: req.data.name ,
                time :req.data.time ,
                category:req.data.category ,
                status:req.data.status ,
                Artists:req.data.artists      
            })
            let event = await cds.db.run (query)
            const entries = [...event]
            return {
                acknowledge: 'succeeded',
                message: entries[0].ID
            };
        } catch (error) {
            return {
                acknowledge: 'failed',
                message: req.data.toString()
            };
        }
    });

    /**
     * The generic error handler which catch all the errors thrown by the handlers
     */
    this.on('error', (err, req) => {

        console.log(err);

    })
};