var request = require('supertest');
var app = require('../../server.js');

// This test should start by dropping everything.
describe('Starting Smoke Test *ADMIN* - clearing all sessions in the DB. (Wait, what?)', function() {
    it('[Expect: 200] Note: We do not maintain sessions. Or just do not run this test. ;)' , function(done) {
    request(app).delete('/api/distortAdmin/').expect(200, done);
    });
   });


// This test should test the base /api route to ensure nothing is being returned
 describe('Test Case: *PUBLIC* GET on the base /api route', function() {
    it('[Expect: 403] - Bogus GET request should return "forbidden")', function(done) {
    request(app).get('/api/').expect(403, done);
    });
});


// This test should test a bogus value in our distort API
describe('Test Case: *PUBLIC* GET on an empty database', function() {
 it('[Expect: 404] -  Random bogus GET request should fail', function(done) {
 request(app).get('/api/distort/99999999').expect(404, done);
 });
});


// This test shall do a POST to /api/distortAdmin/12345 
describe('Test Case: *ADMIN* POST a sample broadcastUID of 12345', function() {
    it('[Expect: 201] - Session should be created', function (done) {
        request(app)
        .post('/api/distortAdmin/')
        .send({"broadcastUID":"12345", "broadcastText":"mochaTestPOST"})
        .expect(201)
        .end(function(err, res) {
            if (err) done(err);
        });
        done();
    })
});

// This test should test the base /api route to ensure nothing is being returned
describe('Test Case: *PUBLIC* GET on a database with at least one document, using an incorrect UID', function() {
    it('[Expect: 404] - No sessions should be returned', function(done) {
    request(app).get('/api/distort/66666666', function (err, response, body){
    }).expect(404, done);
    })
    
});


// This test should test the base /api route to ensure that the earlier broadcastUID returns
describe('Test Case: *ADMIN* GET on a database with at least one document, using a known UID', function() {
    it('[Expect: 200] - Session should be returned', function(done) {
    request(app).get('/api/distortAdmin/12345', function (err, response, body){
    }).expect(200, done);
    })
    
});


// This test should test the base /api route to ensure that the earlier broadcastUID doesn't show up publicly
describe('Test Case: *PUBLIC* GET on a database with at least one document, using a known UID', function() {
    it('[Expect: 404] - Session should NOT be returned as default state should NOT be active', function(done) {
    request(app).get('/api/distort/12345', function (err, response, body){
    }).expect(404, done);
    })
});

// This test should test the base api route and enable the session for broadcast.
describe('Test Case: *ADMIN* UPDATE on a database using a known UID to activate the session', function() {
    it('[Expect: 202] - Session should be updated (and publicly accessible)', function(done) {
    request(app)
    .put('/api/distortAdmin/activate')
    .send({"broadcastUID":"12345"})
    .expect(202)
    .end(function (err, response){
        if (err) done (err);
    });
    done();
    })
    
});


// This test should test the base /api route to ensure that the earlier broadcastUID now shows up publicly
describe('Test Case: *PUBLIC* GET on a database with at least one document, using a known UID', function() {
    it('[Expect: 200] - Session should be returned as the state should now be active', function(done) {
    request(app).get('/api/distort/12345', function (err, response, body){
    }).expect(200, done);
    })
});


// This test should test the base api route and disable the session for broadcast.
describe('Test Case: *ADMIN* UPDATE on a database using a known UID to deactivate the session', function() {
    it('[Expect: 202] - Session should be updated (and no longer publicly accessible)', function(done) {
    request(app)
    .put('/api/distortAdmin/deactivate')
    .send({"broadcastUID":"12345"})
    .expect(202)
    .end(function (err, response){
        if (err) done (err);
    });
    done();
    })
    
});


// This test should test the base /api route to ensure that the earlier broadcastUID doesn't show up publicly
describe('Test Case: *PUBLIC* GET on a database with at least one document, using a known UID', function() {
    it('[Expect: 404] - Session should NOT be returned as state should NOT be active after the update', function(done) {
    request(app).get('/api/distort/12345', function (err, response, body){
    }).expect(404, done);
    })
});


// This test should test the base /api route to ensure deletion happens
describe('Test Case: *ADMIN* DELETE on a database with at least one document, using a known UID', function() {
    it('[Expect: 200]  - Should delete the session and return 200', function(done) {
    request(app).delete('/api/distortAdmin/12345', function (err, response, body){
    }).expect(200, done);
    })
});


// This test should test the base /api route to ensure our delete actually worked
describe('Test Case: *ADMIN* DELETE on a database using same known UID', function() {
    it('[Expect: 404] - Should have already been deleted', function(done) {
    request(app).delete('/api/distortAdmin/12345', function (err, response, body){
    }).expect(404, done);
    })
    
});




