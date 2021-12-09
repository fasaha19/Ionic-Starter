"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppEventsService = void 0;
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/internal/Subject");
var Subscription_1 = require("rxjs/internal/Subscription");
var AppEventsService = /** @class */ (function () {
    function AppEventsService() {
        this.openCategoryPage = new Subject_1.Subject();
        this.openDeepLink = new Subject_1.Subject();
        this.openHomePage = new Subject_1.Subject();
        this.openShippingAddressPage = new Subject_1.Subject();
        this.setting = new Subject_1.Subject();
        this.showAd = new Subject_1.Subject();
        this.settingsLoaded = new Subject_1.Subject();
        this.recentDeleted = new Subject_1.Subject();
        this.cartChange = new Subject_1.Subject();
        this.wishListUpdate = new Subject_1.Subject();
        this.openThankYouPage = new Subject_1.Subject();
        this.openSubcategoryPage = new Subject_1.Subject();
        this.countryChange = new Subject_1.Subject();
        this.stateChange = new Subject_1.Subject();
        this.updateSideMenu = new Subject_1.Subject();
        this.productExpired = new Subject_1.Subject();
        this.loginWithPhoneNumber = new Subject_1.Subject();
        this.userLogin = new Subject_1.Subject();
        this.userLogout = new Subject_1.Subject();
        this.subscriptions = new Subscription_1.Subscription();
        this.openCategoryPage$ = this.openCategoryPage.asObservable();
        this.openDeepLink$ = this.openDeepLink.asObservable();
        this.openHomePage$ = this.openHomePage.asObservable();
        this.openShippingAddressPage$ = this.openShippingAddressPage.asObservable();
        this.setting$ = this.setting.asObservable();
        this.recentDeleted$ = this.recentDeleted.asObservable();
        this.settingsLoaded$ = this.settingsLoaded.asObservable();
        this.cartChange$ = this.cartChange.asObservable();
        this.wishListUpdate$ = this.wishListUpdate.asObservable();
        this.showAd$ = this.showAd.asObservable();
        this.openThankYouPage$ = this.openThankYouPage.asObservable();
        this.openSubcategoryPage$ = this.openSubcategoryPage.asObservable();
        this.countryChange$ = this.countryChange.asObservable();
        this.stateChange$ = this.stateChange.asObservable();
        this.updateSideMenu$ = this.updateSideMenu.asObservable();
        this.productExpired$ = this.productExpired.asObservable();
        this.loginWithPhoneNumber$ = this.loginWithPhoneNumber.asObservable();
        this.userLogin$ = this.userLogin.asObservable();
        this.userLogout$ = this.userLogout.asObservable();
    }
    AppEventsService.prototype.publish = function (eventName, eventData) {
        if (eventName == "openCategoryPage")
            this.openCategoryPage.next(eventData);
        if (eventName == "openDeepLink")
            this.openDeepLink.next(eventData);
        if (eventName == "openHomePage")
            this.openHomePage.next(eventData);
        if (eventName == "openShippingAddressPage")
            this.openShippingAddressPage.next(eventData);
        if (eventName == "setting")
            this.setting.next(eventData);
        if (eventName == "settingsLoaded")
            this.settingsLoaded.next(eventData);
        if (eventName == "recentDeleted")
            this.recentDeleted.next(eventData);
        if (eventName == "cartChange")
            this.cartChange.next(eventData);
        if (eventName == "wishListUpdate")
            this.wishListUpdate.next(eventData);
        if (eventName == "showAd")
            this.showAd.next(eventData);
        if (eventName == "openThankYouPage")
            this.openThankYouPage.next(eventData);
        if (eventName == "openSubcategoryPage")
            this.openSubcategoryPage.next(eventData);
        if (eventName == "countryChange")
            this.countryChange.next(eventData);
        if (eventName == "stateChange")
            this.stateChange.next(eventData);
        if (eventName == "updateSideMenu")
            this.updateSideMenu.next(eventData);
        if (eventName == "productExpired")
            this.productExpired.next(eventData);
        if (eventName == "loginWithPhoneNumber")
            this.loginWithPhoneNumber.next(eventData);
        if (eventName == "userLogin")
            this.userLogin.next(eventData);
        if (eventName == "userLogout")
            this.userLogout.next(eventData);
    };
    AppEventsService.prototype.subscribe = function (eventName) {
        if (eventName == "openCategoryPage")
            return { subscriptions: this.subscriptions, event: this.openCategoryPage$ };
        if (eventName == "openDeepLink")
            return { subscriptions: this.subscriptions, event: this.openDeepLink$ };
        if (eventName == "openHomePage")
            return { subscriptions: this.subscriptions, event: this.openHomePage$ };
        if (eventName == "setting")
            return { subscriptions: this.subscriptions, event: this.setting$ };
        if (eventName == "settingsLoaded")
            return { subscriptions: this.subscriptions, event: this.settingsLoaded$ };
        if (eventName == "recentDeleted")
            return { subscriptions: this.subscriptions, event: this.recentDeleted$ };
        if (eventName == "cartChange")
            return { subscriptions: this.subscriptions, event: this.cartChange$ };
        if (eventName == "wishListUpdate")
            return { subscriptions: this.subscriptions, event: this.wishListUpdate$ };
        if (eventName == "showAd")
            return { subscriptions: this.subscriptions, event: this.showAd$ };
        if (eventName == "openShippingAddressPage")
            return { subscriptions: this.subscriptions, event: this.openShippingAddressPage$ };
        if (eventName == "openThankYouPage")
            return { subscriptions: this.subscriptions, event: this.openThankYouPage$ };
        if (eventName == "openSubcategoryPage")
            return { subscriptions: this.subscriptions, event: this.openSubcategoryPage$ };
        if (eventName == "countryChange")
            return { subscriptions: this.subscriptions, event: this.countryChange$ };
        if (eventName == "stateChange")
            return { subscriptions: this.subscriptions, event: this.stateChange$ };
        if (eventName == "updateSideMenu")
            return { subscriptions: this.subscriptions, event: this.updateSideMenu$ };
        if (eventName == "productExpired")
            return { subscriptions: this.subscriptions, event: this.productExpired$ };
        if (eventName == "loginWithPhoneNumber")
            return { subscriptions: this.subscriptions, event: this.loginWithPhoneNumber$ };
        if (eventName == "userLogin")
            return { subscriptions: this.subscriptions, event: this.userLogin$ };
        if (eventName == "userLogout")
            return { subscriptions: this.subscriptions, event: this.userLogout$ };
    };
    AppEventsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppEventsService);
    return AppEventsService;
}());
exports.AppEventsService = AppEventsService;
