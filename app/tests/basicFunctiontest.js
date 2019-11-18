var request = require('supertest');
var app = require('../../server.js');

/* 
E2E test - post a sample UID and ensure that it is displayed.
*/
// This test should start by dropping everything.
describe('Starting basic function Test. Clearing all sessions in the DB. (Wait, what?)', function() {
    it('[Expect: 200] Note: We do not maintain sessions. Or just do not run this test!)' , function(done) {
    request(app).delete('/api/distortAdmin/').expect(200, done);
    });
   });

    // This test shall do a POST to /api/distortAdmin and create a new broadcast UID 
    describe('Test Case: *ADMIN* POST a sample broadcastUID of 7777 and ensure that it is made public', function() {
        it('[Expect: 201] - Session should be created', function (done) {
            request(app)
            .post('/api/distortAdmin')
            .send({"broadcastUID":"7777", "broadcastText":"exampleTestPasswordThatICannotSee"})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
            });
            done();
        })
    });


    // This test should test the base api route and enable the session for broadcast
    // This should then disable after a certain period of time.
    describe('Test Case: *ADMIN* UPDATE using the known UID to activate/deactivate the session', function() {
        it('[Expect: 202] - Session should be updated (and no longer publicly accessible)', function(done) {
        request(app)
        .put('/api/distortAdmin/activateWithLimit')
        .send({"broadcastUID":"7777"})
        .expect(202)
        .end(function (err, response){
            if (err) done (err);
        });
        done();
        })
        
    });

    // This test verifies that the earlier UID does in fact show up
    describe('Test Case: GET the known UUID', function() {
        it('[Expect: 200] - Session should be returned as the state should now be active', function(done) {
        request(app).get('/api/distort/7777', function (err, response, body){
        }).expect(200, done);
        })
    });


    // This test verifies that the earlier UID is no longer seen.
    describe('Test Case: *PUBLIC* GET on a database with at least one document, using a known UID', function() {
        it('[Expect: 404] - Session no longer should be active and should be hidden/not shown to the client', function(done) {

            this.timeout(30000);

            setTimeout(function () {
                request(app).get('/api/distort/7777', function (err, response, body){
                }).expect(404, done);
              }, 5000);
        })
    });

   