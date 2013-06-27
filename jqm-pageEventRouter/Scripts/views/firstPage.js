var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../framework/pageEventRouter.ts" />
var views;
(function (views) {
    var firstPage = (function (_super) {
        __extends(firstPage, _super);
        function firstPage() {
            _super.apply(this, arguments);

        }
        firstPage.prototype.Create = function () {
            this.state = new Date().getTime().toString();
            console.log("create first page. state = " + this.state);
        };
        firstPage.prototype.Loading = function () {
            var spn = $.mobile.activePage.find("span:jqmData(id='spnDateCreated')").get(0);
            if(spn !== undefined) {
                spn.innerText = this.state;
            }
        };
        return firstPage;
    })(pageEventRouter.basePage);
    views.firstPage = firstPage;    
})(views || (views = {}));
//@ sourceMappingURL=firstPage.js.map
