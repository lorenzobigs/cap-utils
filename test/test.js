const cds = require('@sap/cds')
const assert = require('assert');


describe('CAP Utils Testing', function () {
    /**
     * starts a CAP Server in a beforeAll() hook and shuts it down in an afterAll()
     * hook when all tests are finished
     */

    const { test, expect } = cds.test('serve', '--profile', 'local');

    let author_id;

    it('should return unauthorized on Books Entity', async () => {

    await test.get('/odata/v4/valid/Books')
        .catch((reason) => {
            expect(reason.response.status).to.equal(401);
        })
    }),

    it('should return unauthorized on Authors entity', async () => {

        await test.get('/odata/v4/valid/Books')
            .catch((reason) => {
                expect(reason.response.status).to.equal(401);
            })
    }),

    it('should return a list of 5 books', async () => {
        const { data, status } = await test.get('/odata/v4/valid/Books',
            { auth: { username: 'basic_user', password: 'pw' } });
        expect(data.value.length).to.eql(5);
        expect(status).to.eql(200);
    }),

    it('should create an author', async () => {
        const { data, status } = await test.post('/odata/v4/valid/Authors',
            { name: "Friedrich Nietzsche", favorite: true },
            { auth: { username: 'basic_user', password: 'pw' } }
        );
        author_id = data.ID;
        expect(status).to.eql(201);
    }),

    it('should retrieve the author created', async () => {
        const { data, status } = await test.get(`/odata/v4/valid/Authors/${author_id}`,
            { auth: { username: 'basic_user', password: 'pw' } }
        );
        expect(data.ID).to.eql(author_id);
        expect(status).to.eql(200);
    }),

    it('should delete the author created', async () => {
        const { status } = await test.delete(`/odata/v4/valid/Authors/${author_id}`,
            { auth: { username: 'basic_user', password: 'pw' } }
        );
        expect(status).to.eql(204);
    }),

    it('should consume external service', async () => {
        const { data, status } = await test.get('/odata/v4/external/Categories',
            { auth: { username: 'basic_user', password: 'pw' } });
        expect(status).to.eql(200);
    })
})
