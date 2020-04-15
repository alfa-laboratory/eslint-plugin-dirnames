"use strict";

var matchKebabCaseRule = require("../../../lib/rules/match-kebab-case");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();

ruleTester.run("match-kebab-case", matchKebabCaseRule, {
    valid: [
        {
            code: "",
            filename: "/foo/bar.js"
        },
        {
            code: "",
            filename: "/foo-bar1/bar.js"
        },
    ],
    invalid: [
        {
            code: "",
            filename: "/foo-/bar.js",
            errors: [
                { message: 'Dirname "foo-" does not match the naming convention "kebab-case". Rename it to "foo"'}
            ]
        },
        {
            code: "",
            filename: "/foo-/bar-/bar.js",
            errors: [
                { message: 'Dirname "foo-" does not match the naming convention "kebab-case". Rename it to "foo"'},
                { message: 'Dirname "bar-" does not match the naming convention "kebab-case". Rename it to "bar"'}
            ]
        },
    ]
});