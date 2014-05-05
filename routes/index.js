
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index');
};

/*
 * Partial views, mainly for angular
 */
exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};
