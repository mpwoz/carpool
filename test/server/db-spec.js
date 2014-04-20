
var rides = require('../../models/ride'),
    tokens = require('../../models/token');

describe("rides database", function() {
  it("should select a row", function() {
    rides.select({'id': '1'}, function(rows, fields) {
      expect(rows).toBeDefined();
    });
  });

  it("should select all rows", function() {
    rides.fetchList(function(rows, fields) {
      expect(rows).toBeDefined();
    });
  });

  var ride = {
    'email': 'test@illinois.edu',
    'startLocation': 'Champaign, IL',
    'endLocation': 'Chicago, IL',
    'seats': 4,
    'seatPrice': 10
  };
  var token = {
    'ride_id': 1,
    'token': 'abcdefgh',
    'created':'2014-03-15T20:50:48.000Z'
  };
 
 
  it("should insert a row", function() {
    rides.insert(ride, function(result) {
      id = result.insertId;
      expect(result).toBeDefined();
     
      rides.select({'id': id}, function(rows, fields) {
        expect(rows[0].email).toEqual(ride.email);
      });
    });
  });

/*
  it("should delete a row", function() {
    // TODO select all test@test.com, compare before/after delete
    rides.delete(ride, function(result) {
      expect(result).toBeDefined();
    });
  });

  it("should remove a token from database", function(done) {
    tokens.deleteToken(token.ride_id, function(result){
      expect(result).toBeDefined();
    });
  });

  it("should find a token by ride", function(done){
    tokens.findTokenByRide({'ride_id': 1}, function(result){
      expect(result).toBeDefined();
    })
  });

*/
});


