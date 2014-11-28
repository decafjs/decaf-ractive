/**
 * Created by mschwartz on 11/28/14.
 */

require.paths.unshift('lib');

var Application = require('decaf-jolt').Application,
    StaticServer = require('decaf-jolt-static').StaticServer,
    StaticFile = require('decaf-jolt-static').StaticFile,
    SjsServer = require('decaf-jolt-sjs').SjsServer,
    SjsFile = require('decaf-jolt-sjs').SjsFile,
    Page = require('Page'),
    app = new Application();

app.verb('/', function(req, res) {
    var page = new Page(req.res);
    page.render('home');
});
app.listen(9090, '127.0.0.1');
