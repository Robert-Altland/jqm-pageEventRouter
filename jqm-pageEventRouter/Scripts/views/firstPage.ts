/// <reference path="../framework/pageEventRouter.ts" />

module views {
    export class firstPage extends pageEventRouter.basePage {

        state: string;

        Create() {
            this.state = new Date().getTime().toString();
            console.log("create first page. state = " + this.state);
        }

        Loading() {
            var spn = $.mobile.activePage.find("span:jqmData(id='spnDateCreated')").get(0);
            if(spn !== undefined) spn.innerText = this.state;
        }
    }
}