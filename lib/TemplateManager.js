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

    var cacheTemplate = sync(function(name) {
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
            throw new Error('Template "' + path + '" not found');
        }
        var modified = f.lastModified();
        if (modified > t.modified) {
            t.template = Ractive.parse(f.readAll());
            t.modified = modified;
        }
        return t.template;
    }, templates);

    return new JavaAdapter(org.mozilla.javascript.NativeObject, {
        get : function( name, start ) {
            name = String(name);
            if (name === 'stackText') {
                return undefined;
            }
            return cacheTemplate(name);
        },
        has: function(name, start) {
            var path = template_path + name + '.mustache',
                f = new File(path);

            //if (String(name) === '__iterator__') {
            //    return false;
            //}
            return f.isFile();
        },
        getIds: function() {
            var f = new File(template_path),
                results = [];
            decaf.each(f.listRecursive(/.mustache/), function(filename) {
                results.push(filename.split('/').pop().replace('.mustache', ''));
            });
            return results;
        }
    });
}

module.exports = TemplateManager;
