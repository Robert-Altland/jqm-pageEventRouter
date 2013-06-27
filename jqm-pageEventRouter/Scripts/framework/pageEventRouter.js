/// <reference path="../typedef/jquery.d.ts" />
/// <reference path="../typedef/jquerymobile.d.ts" />
// TODO: come up with a slick name. less ember, handlebars, bootstrap and more functional
var pageEventRouter;
(function (pageEventRouter) {
    var constants = (function () {
        function constants() { }
        constants.MOBILEINIT = "mobileinit";
        constants.CODEBEHINDATTRIBUTE = "codebehind";
        return constants;
    })();
    pageEventRouter.constants = constants;    
    var pageEvents = (function () {
        function pageEvents() { }
        pageEvents.CREATE = "pagecreate";
        pageEvents.INIT = "pageinit";
        pageEvents.BEFORESHOW = "pagebeforeshow";
        pageEvents.SHOW = "pageshow";
        pageEvents.BEFOREHIDE = "pagebeforehide";
        return pageEvents;
    })();
    pageEventRouter.pageEvents = pageEvents;    
    var codeBehindMethodNames = (function () {
        function codeBehindMethodNames() { }
        codeBehindMethodNames.CREATE = "Create";
        codeBehindMethodNames.INIT = "Init";
        codeBehindMethodNames.LOADING = "Loading";
        codeBehindMethodNames.LOADED = "Loaded";
        codeBehindMethodNames.UNLOADING = "Unloading";
        return codeBehindMethodNames;
    })();
    pageEventRouter.codeBehindMethodNames = codeBehindMethodNames;    
    var basePage = (function () {
        function basePage() { }
        basePage.prototype.Create = function () {
            console.log("basePage.Create");
        };
        basePage.prototype.Init = function () {
            console.log("basePage.Init");
        };
        basePage.prototype.Loading = function () {
            console.log("basePage.Loading");
        };
        basePage.prototype.Loaded = function () {
            console.log("basePage.Loaded");
        };
        basePage.prototype.Unloading = function () {
            console.log("basePage.Unloading");
        };
        return basePage;
    })();
    pageEventRouter.basePage = basePage;    
    function ensureCodebehind(event) {
        var codebehind = $(event.target).jqmData(constants.CODEBEHINDATTRIBUTE);
        if(codebehind instanceof basePage) {
            return codebehind;
        }
        // TODO: optimize this using :jqmData
        var attr = $(event.target).attr('data-codebehind');
        if(attr === undefined) {
            console.log("No data-codebehind attribute defined on this page");
            return null;
        }
        // TODO: eval is very bad. find an alternative to dynamically create
        try  {
            var codebehindObj = eval('new ' + attr + '();');
            if(codebehindObj instanceof basePage) {
                $(event.target).jqmData(constants.CODEBEHINDATTRIBUTE, codebehindObj);
                return $(event.target).jqmData(constants.CODEBEHINDATTRIBUTE);
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }
    pageEventRouter.ensureCodebehind = ensureCodebehind;
})(pageEventRouter || (pageEventRouter = {}));
(function ($) {
    var globals = pageEventRouter.constants;
    var pageEvents = pageEventRouter.pageEvents;
    var codeBehindMethodNames = pageEventRouter.codeBehindMethodNames;
    var basePage = pageEventRouter.basePage;
    var ensureCodebehind = pageEventRouter.ensureCodebehind;
    $(document).bind(globals.MOBILEINIT, function () {
        $(document).on(pageEvents.CREATE, function (event) {
            var codebehind = ensureCodebehind(event);
            if(codebehind instanceof basePage) {
                codebehind[codeBehindMethodNames.CREATE].call(codebehind);
            }
        });
        $(document).on(pageEvents.INIT, function (event) {
            var codebehind = ensureCodebehind(event);
            if(codebehind instanceof basePage) {
                codebehind[codeBehindMethodNames.INIT].call(codebehind);
            }
        });
        $(document).on(pageEvents.BEFORESHOW, function (event) {
            var codebehind = ensureCodebehind(event);
            if(codebehind instanceof basePage) {
                codebehind[codeBehindMethodNames.LOADING].call(codebehind);
            }
        });
        $(document).on(pageEvents.SHOW, function (event) {
            var codebehind = ensureCodebehind(event);
            if(codebehind instanceof basePage) {
                codebehind[codeBehindMethodNames.LOADED].call(codebehind);
            }
        });
        $(document).on(pageEvents.BEFOREHIDE, function (event) {
            var codebehind = ensureCodebehind(event);
            if(codebehind instanceof basePage) {
                codebehind[codeBehindMethodNames.UNLOADING].call(codebehind);
            }
        });
    });
})(jQuery);
//@ sourceMappingURL=pageEventRouter.js.map
