/**
 * Created by mschwartz on 11/28/14.
 */

var Ractive = require('decaf-ractive').Ractive,
    TemplateManager = require('decaf-ractive').TemplateManager;

Ractive.partials = new TemplateManager('partials');

function Page(req, res) {
    this.req = req;
    this.res = res;
    this._scripts = [];
    this._css = [];
}
decaf.extend(Page.prototype, {
    render: function (tpl, o) {
        var ractive = new Ractive({
            template: Ractive.partials[tpl],
            data: o || {}
        });
        res.send(ractive.toHTML());
    }
});

module.exports = Page;
