'use strict'

var api = require('../../routes/api'),
    request = require('request');

/* jasmine specs for server go here */

describe("server", function() {
  it("should fetch a ride's details", function(done) {
    request('http://localhost:8000/api/rides/1', function(err, res, body) {
      console.log(res);
      console.log(body);
      done();
    });
  //  var mockReq = {
  //    params: { id: 1 }
  //  };
  //  var mockRes = {
  //    json: function(ride) {
  //      console.log(ride);
  //      expect(ride).toBeDefined();
  //      done();
  //    }
  //  };
  //  api.getRide(mockReq, mockRes);
  });
});
