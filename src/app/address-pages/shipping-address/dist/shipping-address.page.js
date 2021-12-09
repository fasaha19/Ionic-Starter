"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShippingAddressPage = void 0;
var core_1 = require("@angular/core");
var ShippingAddressPage = /** @class */ (function () {
    function ShippingAddressPage(navCtrl, config, appUserService, appOrderService, appCoordinatesService, appToastService) {
        this.navCtrl = navCtrl;
        this.config = config;
        this.appUserService = appUserService;
        this.appOrderService = appOrderService;
        this.appCoordinatesService = appCoordinatesService;
        this.appToastService = appToastService;
        this.currentViewString = "addresslist"; // or add new address
        this.disableSaveButtonBool = true;
        if (this.appUserService.whoIsUser() == "guest")
            this.currentViewString = "addnewaddress";
    }
    ShippingAddressPage.prototype.showCancelButton = function () {
        if (this.appUserService.whoIsUser() == "customer")
            return true;
    };
    ShippingAddressPage.prototype.showAddNewAddressSecton = function () {
        this.currentViewString = "addnewaddress";
    };
    ShippingAddressPage.prototype.getFormData = function (event) {
        this.disableSaveButtonBool = !event.valid;
        this.shippingAddressformData = event.value;
    };
    ShippingAddressPage.prototype.saveFormData = function () {
        //if (!this.appOrderService.addressIsFilled() && this.appUserService.whoIsUser() == "customer")
        this.appOrderService.addUserAddressToServer(this.shippingAddressformData);
        this.appOrderService.setOrderShippingAddress(this.shippingAddressformData);
        this.appOrderService.setOrderBillingAddress(this.shippingAddressformData);
        this.goToPaymentPage();
    };
    ShippingAddressPage.prototype.updateLocation = function () {
        var _this = this;
        this.appCoordinatesService.getCurrentLocationCoordinates().then(function (data) {
            if (data != "error") {
                _this.appOrderService.orderDetails.latlong = String(data.lat) + "," + String(data.long);
                _this.appToastService.toastMiddle("Location Updated");
            }
            else {
                _this.disableSaveButtonBool = true;
            }
        });
    };
    ShippingAddressPage.prototype.goToPaymentPage = function () {
        if (this.appOrderService.orderDetails.latlong == "" || this.appOrderService.orderDetails.latlong == undefined) {
            this.appToastService.toastMiddle("updating location. Please Enable Location Service.");
            this.updateLocation();
        }
        else
            this.navCtrl.navigateForward("/payment");
    };
    ShippingAddressPage.prototype.cancelAddAddress = function () {
        this.currentViewString = "addresslist";
    };
    ShippingAddressPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    ShippingAddressPage.prototype.ngOnInit = function () {
    };
    ShippingAddressPage = __decorate([
        core_1.Component({
            selector: 'app-shipping-address',
            templateUrl: './shipping-address.page.html',
            styleUrls: ['./shipping-address.page.scss']
        })
    ], ShippingAddressPage);
    return ShippingAddressPage;
}());
exports.ShippingAddressPage = ShippingAddressPage;
