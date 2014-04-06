'use strict'

var request = require('request');

describe("server", function() {
  it("should fetch a ride's details", function(done) {
    request.get('http://localhost:8000/api/rides/1', function(error, response, body) {
      body = JSON.parse(body);
      //console.log(body);
      expect(body.id).toEqual(1);
      expect(body.riders.length).toEqual(3);
      done();
    });
  });
});
