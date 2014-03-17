
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
  
  it("should insert a row", function() {
    var id;
    rides.insert(ride, function(result) {
      console.log(result);
      id = result.insertId
      expect(result).toBeDefined();
    });

    rides.select({'id': id}, function(rows, fields) {
      expect(rows[0].email).toEqual(email);
    });
  });


  it("should delete a row", function() {
    // TODO select all test@test.com, compare before/after delete
    rides.delete(ride, function(result) {
      expect(result).toBeDefined();
    });
  });


});

