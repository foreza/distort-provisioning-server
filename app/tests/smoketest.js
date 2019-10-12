var request = require('supertest');
var app = require('../../server.js');

// This test should test a bogus value in our distort API
describe('GET /api/distort/<somebogusvalue>', function() {
 it('[Expect Not Found] - Bogus GET request', function(done) {
 request(app).get('/api/distort/99999999').expect("Not Found", done);
 });

});

// This test should test the base /api route to ensure nothing is being returned
 describe('GET /api/', function() {
    it('[Expect Not Found] - Bogus GET request', function(done) {
    request(app).get('/api/').expect("Can't touch this", done);
    });
});

// This test shall do a POST to /api/distort/12345 
describe('POST followed by GET on a session', function() {
    it('[Expect to post the session]', function (done) {
        request(app)
        .post('/api/distort/')
        .send({"broadcastUID":"12345", "broadcastText":"mochaTestPOST"})
        .expect(201)
        // .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) done(err);
        });

        done();
    })
});


// This test should test the base /api route to ensure nothing is being returned
describe('GET /api/distort', function() {
    it('[Expect to get the session]', function(done) {
    request(app).get('/api/distort/123456', function (err, response, body){
    }).expect(404, done);
    })
    
});

