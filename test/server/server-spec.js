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

describe("server", function() {
	it("should get a list of user rides", function(done) {
		request.get('http://localhost:8000/api/userrides/wozniew1', function(error, response, body) {
			body = JSON.parse(body);
			expect(body[0].id).toEqual(1);
			expect(body[0].riders.length).toEqual(3);
			done();
		})
	});
});
