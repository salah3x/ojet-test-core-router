import * as ko from "knockout";
import RootViewModel from "./appController";
import "ojs/ojknockout";
import "ojs/ojmodule";
import "ojs/ojnavigationlist";
import "ojs/ojbutton";
import "ojs/ojtoolbar";

export default class Root {
  constructor() {
    // if running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready
    // event before executing any code that might interact with Cordova APIs or plugins.
    if (document.body.classList.contains("oj-hybrid")) {
      document.addEventListener("deviceready", this.init);
    } else {
      this.init();
    }
  }

  init(): void {
    ko.applyBindings(new RootViewModel(), document.getElementById("globalBody"));
  }
}