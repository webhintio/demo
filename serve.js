var static = require('node-static');
var file = new static.Server('./');

require('http').createServer(function (request, response) {
    console.log('Serving on http://localhost:4200/');

    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(4200);
