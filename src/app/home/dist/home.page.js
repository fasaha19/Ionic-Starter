"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.HomePage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var core_2 = require("@capacitor/core");
var app_log_page_page_1 = require("../modals/app-log-page/app-log-page.page");
var splash_screen_1 = require("@capacitor/splash-screen");
var HomePage = /** @class */ (function () {
    //for product slider after banner
    function HomePage(nav, config, modalCtrl, appEventsService, router, shared, appCartService, appRecentProductsService) {
        this.nav = nav;
        this.config = config;
        this.modalCtrl = modalCtrl;
        this.appEventsService = appEventsService;
        this.router = router;
        this.shared = shared;
        this.appCartService = appCartService;
        this.appRecentProductsService = appRecentProductsService;
        this.segments = "topSeller"; //first segment by default 
        this.scrollTopButton = false; //for scroll down fab 
    }
    HomePage.prototype.toggleMenu = function () {
        this.shared.toggleMenu();
    };
    HomePage.prototype.openSearchPage = function () {
        this.nav.navigateForward("search");
    };
    HomePage.prototype.setMethod = function (d) {
        console.log(d);
    };
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage.prototype.ionViewDidEnter = function () {
        if (core_2.Capacitor.isNativePlatform()) {
            splash_screen_1.SplashScreen.hide();
        }
    };
    // For FAB Scroll
    HomePage.prototype.onScroll = function (e) {
        if (e.detail.scrollTop >= 500) {
            this.scrollTopButton = true;
        }
        if (e.detail.scrollTop < 500) {
            this.scrollTopButton = false;
        }
    };
    HomePage.prototype.openAppLog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: app_log_page_page_1.AppLogPagePage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // For Scroll To Top Content
    HomePage.prototype.scrollToTop = function () {
        this.content.scrollToTop(700);
        this.scrollTopButton = false;
    };
    HomePage.prototype.openProducts = function (value) {
        this.nav.navigateForward("/products/0/" + value);
    };
    __decorate([
        core_1.ViewChild(angular_1.IonContent, { static: false })
    ], HomePage.prototype, "content");
    __decorate([
        core_1.ViewChild('recentSlider', { static: false })
    ], HomePage.prototype, "slider");
    HomePage = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss']
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
