'use strict'

var api = require('../../routes/api'); 

/* jasmine specs for server go here */

describe("server", function() {
  it("should fetch a ride's details", function() {
    var mockReq = {
      params: { id: 1 }
    };
    var mockRes = {
      json: function(ride) {
        console.log(ride);
        console.log("Ride");
      }
    };
    api.getRide(mockReq, mockRes);
  });
});
