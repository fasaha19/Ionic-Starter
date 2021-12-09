"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BannerComponent = void 0;
var core_1 = require("@angular/core");
var BannerComponent = /** @class */ (function () {
    function BannerComponent(shared, navCtrl, config, loading, appHttpService, appUserService, appLogService) {
        this.shared = shared;
        this.navCtrl = navCtrl;
        this.config = config;
        this.loading = loading;
        this.appHttpService = appHttpService;
        this.appUserService = appUserService;
        this.appLogService = appLogService;
        this.slideOpts = {
            autoplay: {
                delay: 2500
            }
        };
    }
    BannerComponent.prototype.failedImageLoad = function ($event) {
        console.log($event);
    };
    //===============================================================================================
    //on click image banners
    BannerComponent.prototype.bannerClick = function (image) {
        // if (image.banner_navigation.name == 'Category') {
        //   this.navCtrl.navigateForward("/products/" + image.banner_ref_id);
        // }
        // else if (image.banner_navigation.name == 'Product') {
        //   this.navCtrl.navigateForward("/product-detail/" + image.banner_ref_id)
        // }
        // else {
        this.navCtrl.navigateForward("/products");
        // }
    };
    BannerComponent.prototype.ngOnInit = function () {
    };
    BannerComponent = __decorate([
        core_1.Component({
            selector: 'app-banner',
            templateUrl: './banner.component.html',
            styleUrls: ['./banner.component.scss']
        })
    ], BannerComponent);
    return BannerComponent;
}());
exports.BannerComponent = BannerComponent;
