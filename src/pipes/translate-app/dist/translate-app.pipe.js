"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TranslateAppPipe = void 0;
var core_1 = require("@angular/core");
var TranslateAppPipe = /** @class */ (function () {
    function TranslateAppPipe(shared, appTranslationService) {
        this.shared = shared;
        this.appTranslationService = appTranslationService;
    }
    TranslateAppPipe.prototype.transform = function (value) {
        //console.log(value + " " + this.shared.translationListArray[value.toString()]);
        // if (this.appTranaltionService.translationListArray[value] == undefined) {
        //   if (this.shared.lab)
        //     this.appTranaltionService.missingValues[value] = value;
        //   return value;
        // }
        return this.appTranslationService.translateStringPipe(value);
    };
    TranslateAppPipe = __decorate([
        core_1.Pipe({
            name: 'translate',
            pure: false
        })
    ], TranslateAppPipe);
    return TranslateAppPipe;
}());
exports.TranslateAppPipe = TranslateAppPipe;
