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

