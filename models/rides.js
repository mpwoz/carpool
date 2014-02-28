var db = require('./mysql_db');

module.exports.getRide = function(fields) {
  console.log("getting ride...");
  var rows = db.select('ride', fields);
  console.log(rows);
};
