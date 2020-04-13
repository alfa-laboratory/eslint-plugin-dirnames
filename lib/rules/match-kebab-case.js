'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var path = require('path');
var kebabCase = require('lodash.kebabcase');

function parseDirnames(cwd, pathToFile) {
    var parsed = pathToFile.replace(cwd, '').split(path.sep);
    parsed.shift();

    return parsed;
}

module.exports = {
    create: function(context) {
        var cwd = context.getCwd();
        var filename = context.getFilename();
        var pathToFile = path.resolve(filename);
        var dirnames = parseDirnames(cwd, path.dirname(pathToFile));

        return {
            Program: function(node) {
                dirnames.forEach(function(dirname) {
                    var renamedDirname = kebabCase(dirname);
                    if (dirname !== renamedDirname) {
                        context.report({
                            node: node,
                            message:
                                'Dirname "{{dirname}}" does not match the naming convention "kebab-case". Rename it to "{{renamedDirname}}"',
                            data: {
                                dirname: dirname,
                                renamedDirname: renamedDirname
                            },
                        });
                    }
                });
            },
        };
    },
};