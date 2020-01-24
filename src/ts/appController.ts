import * as ko from "knockout";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import * as  ResponsiveKnockoutUtils from "ojs/ojresponsiveknockoututils";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojknockout";
import "ojs/ojmodule-element";
import { ojNavigationList } from "ojs/ojnavigationlist";
import ModuleRouterAdapter = require("ojs/ojmodulerouter-adapter");
import KnockoutRouterAdapter = require("ojs/ojknockoutrouteradapter");
import CoreRouter = require("ojs/ojcorerouter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");

class FooterLink {
  name: string;
  id: string;
  linkTarget: string;

  constructor( { name, id, linkTarget } : {
    name: string;
    id: string;
    linkTarget: string;
   }) {
    this.name = name;
    this.id = id;
    this.linkTarget = linkTarget;
  }
}

class NavDataItem {
  id: string;
  name: string;
  iconClass: string;

  constructor ( { id, name, iconClass } : {
    id: string;
    name: string;
    iconClass: string
  }) {
    this.id = id;
    this.name = name;
    this.iconClass = iconClass;
  }
}

export default class RootViewModel {
  smScreen: ko.Observable<boolean>;
  module: ModuleRouterAdapter;
  selection: KnockoutRouterAdapter;
  navDataSource: ojNavigationList<string, NavDataItem>["data"];
  appName: ko.Observable<string>;
  userLogin: ko.Observable<string>;
  footerLinks: ko.ObservableArray<FooterLink>;

  constructor() {
    // media queries for repsonsive layouts
    let smQuery: string | null = ResponsiveUtils.getFrameworkQuery("sm-only");
    if (smQuery){
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    }
    
    // router setup
    const router = new CoreRouter([
      { path: '', redirect: 'dashboard' },
      {path: "dashboard"},
      {path: "incidents"},
      {path: "customers"},
      {path: "about"}
    ], { urlAdapter: new UrlParamAdapter() });
    router.sync();
    this.selection = new KnockoutRouterAdapter(router);
    this.module = new ModuleRouterAdapter(router, {});

    // navigation setup
    let navData: NavDataItem[] = [
      new NavDataItem({name: "Dashboard", id: "dashboard", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24"}),
      new NavDataItem({name: "Incidents", id: "incidents", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24"}),
      new NavDataItem({name: "Customers", id: "customers", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24"}),
      new NavDataItem({name: "About", id: "about", iconClass: "oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24"})
    ];

    this.navDataSource = new ArrayDataProvider(navData, {idAttribute: "id"});

    // header

    // application Name used in Branding Area
    this.appName = ko.observable("App Name");

    // user Info used in Global Navigation area
    this.userLogin = ko.observable("john.hancock@oracle.com");

    // footer
    this.footerLinks = ko.observableArray([
      new FooterLink({ name: "About Oracle", id: "aboutOracle", linkTarget: "http://www.oracle.com/us/corporate/index.html#menu-about" }),
      new FooterLink({ name: "Contact Us", id: "contactUs", linkTarget: "http://www.oracle.com/us/corporate/contact/index.html" }),
      new FooterLink({ name: "Legal Notices", id: "legalNotices", linkTarget: "http://www.oracle.com/us/legal/index.html" }),
      new FooterLink({ name: "Terms Of Use", id: "termsOfUse", linkTarget: "http://www.oracle.com/us/legal/terms/index.html" }),
      new FooterLink({ name: "Your Privacy Rights", id: "yourPrivacyRights", linkTarget: "http://www.oracle.com/us/legal/privacy/index.html" })
    ]);
  }
}
