var restify = require('restify');

var PORT = 8080;

function hello(req, res, next) {
  res.send('hello ' + req.params.name);
}

var server = restify.createServer();
server.get('/hello/:name', hello);
server.head('/hello/:name', hello);

server.listen(PORT, function() {
  console.log('%s listening at %s', server.name, server.url);
});
