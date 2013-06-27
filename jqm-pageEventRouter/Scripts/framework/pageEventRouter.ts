/// <reference path="../typedef/jquery.d.ts" />
/// <reference path="../typedef/jquerymobile.d.ts" />

// TODO: come up with a slick name. less ember, handlebars, bootstrap and more functional
module pageEventRouter {
    declare var $;  

    export class constants {
        static MOBILEINIT: string = "mobileinit";
        static CODEBEHINDATTRIBUTE: string = "codebehind";
    }

    export class pageEvents {
        static CREATE: string = "pagecreate";
        static INIT: string = "pageinit";
        static BEFORESHOW: string = "pagebeforeshow";
        static SHOW: string = "pageshow";
        static BEFOREHIDE: string = "pagebeforehide";
    }

    export class codeBehindMethodNames {
        static CREATE: string = "Create";
        static INIT: string = "Init";
        static LOADING: string = "Loading";
        static LOADED: string = "Loaded";
        static UNLOADING: string = "Unloading";
    }  

    export class basePage { 
        Create() {
            console.log("basePage.Create");
        };
        Init () {
            console.log("basePage.Init");
        };
        Loading () {
            console.log("basePage.Loading");
        };
        Loaded () {
            console.log("basePage.Loaded");
        };
        Unloading () {
            console.log("basePage.Unloading");
        };
    }

    export function ensureCodebehind(event: any) : basePage {
        var codebehind = $(event.target).jqmData(constants.CODEBEHINDATTRIBUTE);
        if (codebehind instanceof basePage)
            return codebehind;

        // TODO: optimize this using :jqmData
        var attr = $(event.target).attr('data-codebehind');
        if (attr === undefined) {
            console.log("No data-codebehind attribute defined on this page");
            return null;
        }

        // TODO: eval is very bad. find an alternative to dynamically create
        try {
            var codebehindObj = eval('new ' + attr + '();');
            if (codebehindObj instanceof basePage) {
                $(event.target).jqmData(constants.CODEBEHINDATTRIBUTE, codebehindObj);
                return $(event.target).jqmData(constants.CODEBEHINDATTRIBUTE);
            }
            else {
                return null;
            }
        }
        catch (err) {
            return null;
        }
    }

}
(function ($) { 
    
    var globals = pageEventRouter.constants;
    var pageEvents = pageEventRouter.pageEvents;
    var codeBehindMethodNames = pageEventRouter.codeBehindMethodNames;
    var basePage = pageEventRouter.basePage;
    var ensureCodebehind = pageEventRouter.ensureCodebehind;

    $(document).bind(globals.MOBILEINIT, function () {
        $(document).on(pageEvents.CREATE, function (event) {
            var codebehind = ensureCodebehind(event);
            if (codebehind instanceof basePage) codebehind[codeBehindMethodNames.CREATE].call(codebehind);
        });
        $(document).on(pageEvents.INIT, function (event) {
            var codebehind = ensureCodebehind(event);
            if (codebehind instanceof basePage) codebehind[codeBehindMethodNames.INIT].call(codebehind);
        });
        $(document).on(pageEvents.BEFORESHOW, function (event) {
            var codebehind = ensureCodebehind(event);
            if (codebehind instanceof basePage) codebehind[codeBehindMethodNames.LOADING].call(codebehind);
        });
        $(document).on(pageEvents.SHOW, function (event) {
            var codebehind = ensureCodebehind(event);
            if (codebehind instanceof basePage) codebehind[codeBehindMethodNames.LOADED].call(codebehind);
        });
        $(document).on(pageEvents.BEFOREHIDE, function (event) {
            var codebehind = ensureCodebehind(event);
            if (codebehind instanceof basePage) codebehind[codeBehindMethodNames.UNLOADING].call(codebehind);
        });
    });

})(jQuery);

