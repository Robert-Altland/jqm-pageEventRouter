var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../framework/pageEventRouter.ts" />
/// <reference path="../typedef/qunit.d.ts" />
var testPage = (function (_super) {
    __extends(testPage, _super);
    function testPage() {
        _super.apply(this, arguments);

    }
    testPage.prototype.Create = function () {
        this.created = true;
    };
    testPage.prototype.Init = function () {
        this.init = true;
    };
    testPage.prototype.Loading = function () {
        this.loading = true;
    };
    testPage.prototype.Loaded = function () {
        this.loaded = true;
    };
    testPage.prototype.Unloading = function () {
        this.unloading = true;
    };
    return testPage;
})(pageEventRouter.basePage);
QUnit.module("pageEventRouter Tests");
test("jqm page without data-codebehind attribute doesn't fail", function () {
    $.mobile.activePage.trigger("pagecreate");
    var codebehind = $.mobile.activePage.jqmData(pageEventRouter.constants.CODEBEHINDATTRIBUTE);
    ok(!(codebehind instanceof pageEventRouter.basePage));
    ok(true);
});
test("jqm page with garbage data-codebehind attribute value doesn't fail", function () {
    $.mobile.activePage.attr("data-codebehind", "jkfldsa");
    $.mobile.activePage.trigger("pagecreate");
    var codebehind = $.mobile.activePage.jqmData(pageEventRouter.constants.CODEBEHINDATTRIBUTE);
    ok(!(codebehind instanceof pageEventRouter.basePage));
    ok(true);
});
test("jqm page with data-codebehind attribute value that's not basePage doesn't fail", function () {
    $.mobile.activePage.attr("data-codebehind", "Object");
    $.mobile.activePage.trigger("pagecreate");
    var codebehind = $.mobile.activePage.jqmData(pageEventRouter.constants.CODEBEHINDATTRIBUTE);
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
    var codebehind = $.mobile.activePage.jqmData(pageEventRouter.constants.CODEBEHINDATTRIBUTE);
    ok(codebehind instanceof pageEventRouter.basePage);
    ok(codebehind.created);
    ok(codebehind.init);
    ok(codebehind.loading);
    ok(codebehind.loaded);
    ok(codebehind.unloading);
});
//@ sourceMappingURL=unitTests.js.map
