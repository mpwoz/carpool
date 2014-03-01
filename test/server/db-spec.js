
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
      console.log(rows);
      expect(rows).toBeDefined();
    });
  });

});

