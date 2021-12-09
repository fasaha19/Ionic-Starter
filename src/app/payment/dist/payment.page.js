"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentPage = void 0;
var core_1 = require("@angular/core");
var PaymentPage = /** @class */ (function () {
    function PaymentPage(navCtrl, config, appOrderService, appHttpService) {
        this.navCtrl = navCtrl;
        this.config = config;
        this.appOrderService = appOrderService;
        this.appHttpService = appHttpService;
        this.paymentMethodsArray = [];
    }
    PaymentPage.prototype.selectPaymentMethod = function (value) {
        if (value == "paypal")
            this.appOrderService.orderDetails.payment_method = "paypal";
        if (value == "stripe")
            this.appOrderService.orderDetails.payment_method = "stripe";
        if (value == "banktransfer")
            this.appOrderService.orderDetails.payment_method = "banktransfer";
        if (value == "cash_on_delivery")
            this.appOrderService.orderDetails.payment_method = "cod";
        this.navCtrl.navigateForward("/order");
    };
    PaymentPage.prototype.ngOnInit = function () {
        this.getPaymentMethods();
    };
    PaymentPage.prototype.getPaymentMethods = function () {
        var _this = this;
        var url = "payment_method";
        url += "?language_id=" + this.config.languageIdNumber;
        url += "&getDetail=1";
        url += "&currency=" + this.config.currencyIdNumber;
        this.appHttpService.getHttp(url).then(function (data) {
            _this.paymentMethodsArray = data;
        });
    };
    PaymentPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    PaymentPage = __decorate([
        core_1.Component({
            selector: 'app-payment',
            templateUrl: './payment.page.html',
            styleUrls: ['./payment.page.scss']
        })
    ], PaymentPage);
    return PaymentPage;
}());
exports.PaymentPage = PaymentPage;
