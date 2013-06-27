var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../framework/pageEventRouter.ts" />
var views;
(function (views) {
    var secondPage = (function (_super) {
        __extends(secondPage, _super);
        function secondPage() {
            _super.apply(this, arguments);

        }
        secondPage.prototype.Create = function () {
            this.state = new Date().getTime().toString();
            console.log("create second page. state = " + this.state);
        };
        secondPage.prototype.Loading = function () {
            var spn = $.mobile.activePage.find("span:jqmData(id='spnDateCreated')").get(0);
            if(spn !== undefined) {
                spn.innerText = this.state;
            }
        };
        return secondPage;
    })(pageEventRouter.basePage);
    views.secondPage = secondPage;    
})(views || (views = {}));
//@ sourceMappingURL=secondPage.js.map
