/// <reference path="../framework/pageEventRouter.ts" />
/// <reference path="../typedef/qunit.d.ts" />

class testPage extends pageEventRouter.basePage {

    created: bool;
    init: bool;
    loading: bool;
    loaded: bool;
    unloading: bool;

    Create() {
        this.created = true;
    }

    Init() {
        this.init = true;
    }

    Loading() {
        this.loading = true;
    }

    Loaded() {
        this.loaded = true;
    }

    Unloading() {
        this.unloading = true;
    }
}


QUnit.module("pageEventRouter Tests");

test("jqm page without data-codebehind attribute doesn't fail", function () {
    $.mobile.activePage.trigger("pagecreate");
    var codebehind: testPage = $.mobile.activePage.jqmData(pageEventRouter.constants.CODEBEHINDATTRIBUTE);

    ok(!(codebehind instanceof pageEventRouter.basePage));
    ok(true);
});

test("jqm page with garbage data-codebehind attribute value doesn't fail", function () {
    $.mobile.activePage.attr("data-codebehind", "jkfldsa");
    $.mobile.activePage.trigger("pagecreate");
    var codebehind: testPage = $.mobile.activePage.jqmData(pageEventRouter.constants.CODEBEHINDATTRIBUTE);

    ok(!(codebehind instanceof pageEventRouter.basePage));
    ok(true);
});

test("jqm page with data-codebehind attribute value that's not basePage doesn't fail", function () {
    $.mobile.activePage.attr("data-codebehind", "Object");
    $.mobile.activePage.trigger("pagecreate");
    var codebehind: testPage = $.mobile.activePage.jqmData(pageEventRouter.constants.CODEBEHINDATTRIBUTE);

    ok(!(codebehind instanceof pageEventRouter.basePage));
    ok(true);
});

test("jqm page with valid data-codebehind attribute correctly routes all page events", function () {
    $.mobile.activePage.attr("data-codebehind", "testPage");
    $.mobile.activePage.trigger("pagecreate");
    $.mobile.activePage.trigger("pageinit");
    $.mobile.activePage.trigger("pagebeforeshow");
    $.mobile.activePage.trigger("pageshow");
    $.mobile.activePage.trigger("pagebeforehide");
    var codebehind: testPage = $.mobile.activePage.jqmData(pageEventRouter.constants.CODEBEHINDATTRIBUTE);

    ok(codebehind instanceof pageEventRouter.basePage);
    ok(codebehind.created);
    ok(codebehind.init);
    ok(codebehind.loading);
    ok(codebehind.loaded);
    ok(codebehind.unloading);
});