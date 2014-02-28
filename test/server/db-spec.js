
var rides = require('../../models/rides'),
    db = require('../../models/mysql_db');

describe("database", function() {
  it("should select a row", function() {
    rides.select({'id': '2'}, function(rows, fields) {
      console.log(rows);
      expect(rows).toBeDefined();
    });
  });

});

