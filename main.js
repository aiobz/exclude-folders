/*
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true,  regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module) {
    "use strict";
    
    var FileSystem  = brackets.getModule("filesystem/FileSystem");
    var _oldFilter = FileSystem._FileSystem.prototype._indexFilter;
    var ProjectManager = brackets.getModule("project/ProjectManager");
    var PreferencesManager = brackets.getModule("preferences/PreferencesManager");
    var prefs = PreferencesManager.getExtensionPrefs("exclude");

    // refresh file tree.
    function refreshFileTree() {
        setTimeout(function () {
            ProjectManager.refreshFileTree();
        });
    }

    // listen event on regex change.
    prefs.definePreference("regex", "string", "").on("change", function () {
        refreshFileTree();
    });
    // listen event on modifier change.
    prefs.definePreference("modifier", "string", "").on("change", function () {
        refreshFileTree();
    });
    
    FileSystem._FileSystem.prototype._indexFilter = function (path, name) {
        // Call old filter
        var result = _oldFilter.apply(this, arguments);
        
        if (!result) {
            return false;
        }
        // Exclude folder default is node_module|bower_components.
        var pattern = (prefs.get("regex") && prefs.get("regex").replace(/\"/g, '')) || "^(node_modules|bower_components)$";
        // Modifier
        var modifier = prefs.get("modifier") || '';
        // Initial new regular expression.
        var regex = new RegExp(pattern, modifier);
        
        return !name.match(regex);
    };
});
