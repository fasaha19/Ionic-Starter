"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductCardComponent = void 0;
var core_1 = require("@angular/core");
var ProductCardComponent = /** @class */ (function () {
    function ProductCardComponent(config, shared, navCtrl, appWishListService, appEventsService, appCartService, appToastService, appAnimationsService) {
        this.config = config;
        this.shared = shared;
        this.navCtrl = navCtrl;
        this.appWishListService = appWishListService;
        this.appEventsService = appEventsService;
        this.appCartService = appCartService;
        this.appToastService = appToastService;
        this.appAnimationsService = appAnimationsService;
        this.wishListFlagBool = false;
        this.quantityNumber = 1;
        this.enableOutOFStockButtonBool = false;
        this.viewIsLoadedBool = false;
        this.backgroundIsAppliedBool = false;
    }
    ProductCardComponent.prototype.openProductPage = function () {
        this.shared.singleProductPageDataArray.push(this.data);
        this.navCtrl.navigateForward("/product-detail/" + this.data.product_id);
    };
    ProductCardComponent.prototype.addRemoveWishProduct = function () {
        this.appWishListService.addRemoveWishProduct(this.data.product_id);
    };
    ProductCardComponent.prototype.isInWishList = function () {
        this.wishListFlagBool = this.appWishListService.productIsInList(this.data.product_id);
        return this.wishListFlagBool;
    };
    ProductCardComponent.prototype.addToCart = function () {
        if (this.data.product_type == 'variable') {
            this.openProductPage();
        }
        else {
            this.checkingProductStock();
        }
    };
    ProductCardComponent.prototype.quantityMinus = function () {
        if (this.quantityNumber > 1) {
            this.quantityNumber--;
            this.checkingProductStock();
        }
    };
    ProductCardComponent.prototype.quantityPlus = function () {
        this.quantityNumber++;
        this.checkingProductStock();
    };
    ProductCardComponent.prototype.checkingProductStock = function () {
        var _this = this;
        this.appCartService.checkProductStock(this.data.product_id, this.data.product_type, null, this.quantityNumber).then(function (data) {
            if (data.status == "outOfStock") {
                _this.enableOutOFStockButtonBool = true;
            }
            else if (data.status == "canAddToCart") {
                _this.appCartService.addToCart(_this.data.product_id, _this.quantityNumber, null);
            }
            else if (data.status == "quantityIsLimited") {
                _this.appToastService.toastError("Quantity is Limited");
                _this.quantityNumber = data.stock;
            }
        });
    };
    ProductCardComponent.prototype.productDiscount = function () {
        var rtn = "";
        var p1 = parseInt(this.data.product_price);
        var p2 = parseInt(this.data.product_discount_price);
        var result = Math.abs((p1 - p2) / p1 * 100);
        result = parseInt(result.toString());
        if (result == 0) {
            return false;
        }
        rtn = '-' + result + '%';
        return rtn;
    };
    ProductCardComponent.prototype.ngOnInit = function () {
    };
    ProductCardComponent.prototype.ngAfterViewInit = function () {
        this.viewIsLoadedBool = true;
    };
    ProductCardComponent.prototype.ngDoCheck = function () {
        if (this.viewIsLoadedBool) {
            var card = this.getProductRef();
            if (!card.style.backgroundColor)
                this.backgroundIsAppliedBool = false;
            if (!this.backgroundIsAppliedBool) {
                if (this.data != 1) {
                    this.applyBackgroundColor();
                    this.backgroundIsAppliedBool = true;
                }
            }
        }
    };
    ProductCardComponent.prototype.getProductRef = function () {
        return this.productRef.nativeElement.querySelector('ion-card');
    };
    ProductCardComponent.prototype.applyBackgroundColor = function () {
        var backGroundColorsArray = this.config.productCardColorsArray;
        var card = this.getProductRef();
        card.style.backgroundColor = backGroundColorsArray[this.shared.productCardCounterNumber];
        this.shared.productCardCounterNumber++;
        if (this.shared.productCardCounterNumber == backGroundColorsArray.length)
            this.shared.productCardCounterNumber = 0;
    };
    __decorate([
        core_1.ViewChild('productRef', { static: false })
    ], ProductCardComponent.prototype, "productRef");
    __decorate([
        core_1.Input('data')
    ], ProductCardComponent.prototype, "data");
    ProductCardComponent = __decorate([
        core_1.Component({
            selector: 'app-product-card',
            templateUrl: './product-card.component.html',
            styleUrls: ['./product-card.component.scss']
        })
    ], ProductCardComponent);
    return ProductCardComponent;
}());
exports.ProductCardComponent = ProductCardComponent;
// {
//   "product_id": 1,
//     "product_type": "simple",
//       "product_slug": "simple-product-1",
//         "product_video_url": null,
//           "product_gallary": {
//     "id": 1,
//       "gallary_name": "202102081752OIP.jpg",
//         "detail": [{
//           "id": 1,
//           "gallary_type": "large",
//           "gallary_path": "\/gallary\/large202102081752OIP.jpg"
//         }, {
//           "id": 2,
//           "gallary_type": "medium",
//           "gallary_path": "\/gallary\/medium202102081752OIP.jpg"
//         }, {
//           "id": 3,
//           "gallary_type": "thumbnail",
//           "gallary_path": "\/gallary\/thumbnail202102081752OIP.jpg"
//         }]
//   },
//   "product_gallary_detail": [{
//     "id": 1,
//     "gallary_name": "202102081752OIP.jpg",
//     "detail": [{
//       "id": 1,
//       "gallary_type": "large",
//       "gallary_path": "\/gallary\/large202102081752OIP.jpg"
//     }, {
//       "id": 2,
//       "gallary_type": "medium",
//       "gallary_path": "\/gallary\/medium202102081752OIP.jpg"
//     }, {
//       "id": 3,
//       "gallary_type": "thumbnail",
//       "gallary_path": "\/gallary\/thumbnail202102081752OIP.jpg"
//     }]
//   }, {
//     "id": 2,
//     "gallary_name": "202102183613red.png",
//     "detail": [{
//       "id": 4,
//       "gallary_type": "large",
//       "gallary_path": "\/gallary\/large202102183613red.png"
//     }, {
//       "id": 5,
//       "gallary_type": "medium",
//       "gallary_path": "\/gallary\/medium202102183613red.png"
//     }, {
//       "id": 6,
//       "gallary_type": "thumbnail",
//       "gallary_path": "\/gallary\/thumbnail202102183613red.png"
//     }]
//   }, {
//     "id": 3,
//     "gallary_name": "202102183619blue.png",
//     "detail": [{
//       "id": 7,
//       "gallary_type": "large",
//       "gallary_path": "\/gallary\/large202102183619blue.png"
//     }, {
//       "id": 8,
//       "gallary_type": "medium",
//       "gallary_path": "\/gallary\/medium202102183619blue.png"
//     }, {
//       "id": 9,
//       "gallary_type": "thumbnail",
//       "gallary_path": "\/gallary\/thumbnail202102183619blue.png"
//     }]
//   }],
//     "product_price": 25200,
//       "product_discount_price": 0,
//         "product_unit": null,
//           "product_weight": null,
//             "product_status": "active",
//               "product_brand": {
//     "brand_id": 1,
//       "brand_name": "SamSang",
//         "brand_slug": "Apple",
//           "gallary": {
//       "id": 1,
//         "name": "202102081752OIP.jpg",
//           "extension": "image\/jpeg",
//             "user_id": 1,
//               "created_by": 1,
//                 "updated_by": null,
//                   "deleted_at": null,
//                     "created_at": null,
//                       "updated_at": null
//     },
//     "brand_status": "active"
//   },
//   "product_tax": null,
//     "product_view": null,
//       "is_featured": null,
//         "product_min_order": null,
//           "product_max_order": null,
//             "seo_meta_tag": null,
//               "seo_desc": null,
//                 "stock": null,
//                   "category": [{
//                     "product_id": 1,
//                     "category_detail": {
//                       "id": 1,
//                       "parent_id": null,
//                       "slug": "electronics",
//                       "sort_order": null,
//                       "detail": [{
//                         "category_id": 1,
//                         "name": "Electronics",
//                         "description": "Electronics",
//                         "language": {
//                           "id": 1,
//                           "language_name": "English",
//                           "code": "EN",
//                           "is_default": 1,
//                           "direction": "ltr",
//                           "directory": null
//                         }
//                       }]
//                     }
//                   }],
//                     "detail": [{
//                       "product_id": 1,
//                       "title": " simple product 1",
//                       "desc": " simple product 1",
//                       "language": {
//                         "id": 1,
//                         "language_name": "English",
//                         "code": "EN",
//                         "is_default": 1,
//                         "direction": "ltr",
//                         "directory": null
//                       }
//                     }],
//                       "reviews": [],
//                         "comments": []
// }
