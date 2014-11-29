/**
 * Created with JetBrains WebStorm.
 * User: mschwartz
 * Date: 9/11/13
 * Time: 11:25 AM
 * To change this template use File | Settings | File Templates.
 */

var File = require('File'),
    Ractive = require('ractive');

function TemplateManager( path ) {
	var templates = {},
	    template_path = path;

    if (!template_path.endsWith('/')) {
        template_path += '/';
    }
    return new JavaAdapter(org.mozilla.javascript.NativeObject, {
        get : sync(function( name, start ) {
            console.log(name);
            if (String(name) === 'stackText') {
                return undefined;
            }
            var path = template_path + name + '.mustache',
                t = templates[path];
            if (!t) {
                t = templates[path] = {
                    path     : path,
                    file     : new File(path),
                    modified : 0
                };
            }
            var f = t.file;
            if (!f.isFile()) {
                throw new Error('Template ' + path + ' not found');
            }
            var modified = f.lastModified();
            if (modified > t.modified) {
                t.template = Ractive.parse(f.readAll());
                t.modified = modified;
            }
            return t.template;
        }, templates),
        has: sync(function(name, start) {
            return true;
        }, templates);
    });
}

module.exports = TemplateManager;
