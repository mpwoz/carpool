
var db = require('../../models/rides');

describe("database", function() {
  it("should select a row", function() {
    rows = db.getRide({ id: '0' });
    expect(rows).toBeDefined();
  });
});
