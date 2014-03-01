
var rides = require('../../models/rides'),
    db = require('../../models/mysql_db');

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

  var email = 'test@test.com';
  it("should insert a row", function() {
    var id;
    rides.insert({ 'email': email }, function(result) {
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
    rides.delete({'email': email}, function(result) {
      expect(result).toBeDefined();
    });
  });



});

