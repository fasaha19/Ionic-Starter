"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyOrderDetailPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var app_1 = require("firebase/app");
require("firebase/database");
var js_api_loader_1 = require("@googlemaps/js-api-loader");
var MyOrderDetailPage = /** @class */ (function () {
    function MyOrderDetailPage(navCtrl, config, shared, appHttpService, loading, activatedRoute, appTranslationService, appUserService, appLogService, appAlertService) {
        this.navCtrl = navCtrl;
        this.config = config;
        this.shared = shared;
        this.appHttpService = appHttpService;
        this.loading = loading;
        this.activatedRoute = activatedRoute;
        this.appTranslationService = appTranslationService;
        this.appUserService = appUserService;
        this.appLogService = appLogService;
        this.appAlertService = appAlertService;
        this.order = {};
        this.countLoation = 0;
        //this.order = this.shared.myOrderDetialPageData;
        this.getData();
    }
    MyOrderDetailPage.prototype.getSingleProductDetail = function (id) {
        var _this_1 = this;
        var dat = {};
        if (this.appUserService.customerData != null)
            dat.customers_id = this.appUserService.customerData.customers_id;
        else
            dat.customers_id = null;
        dat.products_id = id;
        dat.language_id = this.config.languageIdNumber;
        dat.currency_code = this.config.currencyCodeString;
        this.appHttpService.postHttp(this.config.urlString + 'getallproducts', dat).then(function (data) {
            _this_1.loading.hide();
            if (data.success == 1) {
                var p = data.product_data[0];
                _this_1.shared.singleProductPageDataArray.push(p);
                _this_1.navCtrl.navigateForward("product-detail/" + p.id);
            }
        });
    };
    MyOrderDetailPage.prototype.getShippingAddressData = function () {
        var selected = false;
        return {
            text1: this.order.delivery_first_name + ' ' + this.order.delivery_last_name,
            text2: this.order.delivery_country_name,
            text3: this.order.delivery_street_aadress + " " + this.order.delivery_city + " " + this.order.delivery_postcode,
            selected: selected
        };
    };
    MyOrderDetailPage.prototype.getBillingAddressData = function () {
        var selected = false;
        return {
            text1: this.order.billing_first_name + ' ' + this.order.billing_last_name,
            text2: this.order.billing_country_name,
            text3: this.order.billing_street_aadress + " " + this.order.billing_city + " " + this.order.billing_postcode,
            selected: selected
        };
    };
    MyOrderDetailPage.prototype.getData = function () {
        var _this_1 = this;
        this.order = {};
        var id = this.activatedRoute.snapshot.paramMap.get('id');
        var url = "customer/order/" + id;
        url += "?orderDetail=1";
        url += "&productDetail=1";
        url += "&language_id=" + this.config.languageIdNumber;
        url += "&currency=" + this.config.currencyIdNumber;
        this.appHttpService.getHttp(url).then(function (data) {
            _this_1.order = data;
            _this_1.ionRefresher.complete();
        });
    };
    MyOrderDetailPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    MyOrderDetailPage.prototype.dataIsEmpty = function () {
        for (var prop in this.order) {
            if (this.order.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    };
    MyOrderDetailPage.prototype.getSubtotal = function () {
        var total = 0;
        this.order.data.forEach(function (element) {
            total += parseFloat(element.final_price);
        });
        return total;
    };
    MyOrderDetailPage.prototype.ionViewDidEnter = function () {
        this.order = this.shared.myOrderDetialPageData;
    };
    // For Scroll To Top Content
    MyOrderDetailPage.prototype.scrollToBottom = function () {
        this.content.scrollToBottom(700);
    };
    MyOrderDetailPage.prototype.trackOrder = function () {
        var message = "Order is not Dispatched Yet!";
        if (this.order.delivery_boy_id == null) {
            this.appAlertService.showAlert(message);
            return 0;
        }
        this.scrollToBottom();
        var _this = this;
        var deliveryBoyLocationDatabase = app_1["default"].database().ref('location/' + this.order.delivery_boy_id);
        deliveryBoyLocationDatabase.on('value', function (value) {
            if (value.val() == null) {
                _this.appAlertService.showAlert(message);
            }
            var loc = value.val();
            _this.loadMapAndSetMarkersThenUpdateDeliveryMarkerLocation(loc.latitude, loc.longitude);
        });
    };
    MyOrderDetailPage.prototype.loadMapAndSetMarkersThenUpdateDeliveryMarkerLocation = function (lat, long) {
        var _this_1 = this;
        if (this.countLoation == 0) {
            console.log(this.order);
            var loader = new js_api_loader_1.Loader({ apiKey: this.config.googleMapApiString });
            var str = this.order.latlong;
            var arrayLatLongDestination = str.split(",");
            var destinationLat_1 = parseFloat(arrayLatLongDestination[0]);
            var destinationLong_1 = parseFloat(arrayLatLongDestination[1]);
            console.log(arrayLatLongDestination);
            var mapStyles_1 = [{
                    elementType: "labels",
                    stylers: [{
                            visibility: "off"
                        }]
                }];
            //load the map on run time
            loader.load().then(function () {
                var marker = null;
                var deliveryBoyStartPosition = new google.maps.LatLng(lat, long);
                var departurePosition = new google.maps.LatLng(lat, long);
                var destinationPosition = new google.maps.LatLng(destinationLat_1, destinationLong_1);
                // departurePosition = new google.maps.LatLng(31.411382823495547, 73.10702210045106)
                // deliveryBoyStartPosition = new google.maps.LatLng(31.414898804236866, 73.11107766722843)
                //destinationPosition = new google.maps.LatLng(31.440399503460657, 73.1073430000827)
                _this_1.orderMap = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: lat, lng: long },
                    zoom: 16,
                    disableDefaultUI: true,
                    styles: mapStyles_1
                });
                // Marker does not exist - Create it
                // this.deliveryBoyMarker = new google.maps.Marker({ position: deliveryBoyStartPosition, map: this.orderMap, icon: 'assets/food-delivery.png' })
                // Marker for departure point 
                var departureMarker = new google.maps.Marker({ position: departurePosition, map: _this_1.orderMap, icon: 'assets/departure.png' });
                // MMarker for destination
                var destinationMarker = new google.maps.Marker({ position: destinationPosition, map: _this_1.orderMap, icon: 'assets/destination.png' });
                // Center the map on the new position
                _this_1.orderMap.setCenter(deliveryBoyStartPosition);
            });
        }
        else {
            //if (this.deliveryBoyMarker) {
            var newLatLong = new google.maps.LatLng(lat, long);
            // Marker does not exist - Create it
            if (this.countLoation % 5 == 0) {
                var deliveryBoyMarker = new google.maps.Marker({ position: newLatLong, map: this.orderMap, icon: 'assets/food-delivery.png' });
            }
            else {
                var dotMarker = new google.maps.Marker({ position: newLatLong, map: this.orderMap, icon: 'assets/dot.png' });
            }
            this.orderMap.setCenter(newLatLong);
            // }
        }
        this.countLoation++;
    };
    MyOrderDetailPage.prototype.testMapLocation = function () {
        var str = this.searchString;
        var arrayLatLongDestination = str.split(",");
        var destinationLat = parseFloat(arrayLatLongDestination[0]);
        var destinationLong = parseFloat(arrayLatLongDestination[1]);
        this.loadMapAndSetMarkersThenUpdateDeliveryMarkerLocation(destinationLat, destinationLong);
    };
    MyOrderDetailPage.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild(angular_1.IonContent, { static: false })
    ], MyOrderDetailPage.prototype, "content");
    __decorate([
        core_1.ViewChild(angular_1.IonRefresher, { static: false })
    ], MyOrderDetailPage.prototype, "ionRefresher");
    MyOrderDetailPage = __decorate([
        core_1.Component({
            selector: 'app-my-order-detail',
            templateUrl: './my-order-detail.page.html',
            styleUrls: ['./my-order-detail.page.scss']
        })
    ], MyOrderDetailPage);
    return MyOrderDetailPage;
}());
exports.MyOrderDetailPage = MyOrderDetailPage;
//map code for show route
// var display = new google.maps.DirectionsRenderer();
// var services = new google.maps.DirectionsService();
// display.setMap(map);
// var request = {
//   origin: departurePosition,
//   destination: destinationPosition,
//   travelMode: google.maps.TravelMode.DRIVING
// };
// services.route(request, function (result, status) {
//   if (status == 'OK') {
//     display.setDirections(result);
//   }
// });
