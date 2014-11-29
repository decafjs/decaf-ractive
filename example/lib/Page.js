/**
 * Created by mschwartz on 11/28/14.
 */

/*global module, require */

var Ractive = require('decaf-ractive').Ractive,
    TemplateManager = require('decaf-ractive').TemplateManager,
    templateManager = new TemplateManager('partials');;

//Ractive.partials = new TemplateManager('partials');

function Page(req, res) {
    this.req = req;
    this.res = res;
    //this._scripts = [];
    //this._css = [];
}

decaf.extend(Page.prototype, {
    render: function (tpl, o) {
        var ractive = new Ractive({
            template: templateManager[tpl],
            //partials: templateManager,
            partials: { header: '<p>header</p>', footer: '<p>footer</p>'},
            data: o || {}
        });
        this.res.send(ractive.toHTML());
    }
});

module.exports = Page;
