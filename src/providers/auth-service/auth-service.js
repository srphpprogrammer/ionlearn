var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as AppConfig from '../../app/app.config';
import 'rxjs/add/operator/catch';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        this.config = AppConfig.config;
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.isLoggedIn = function () {
        return null;
    };
    AuthServiceProvider.prototype.register = function (userData) {
        //register(userData): Observable<UserModel[]>{
        return this.http.post(this.config.apiUrl + this.config.user.register, JSON.stringify(userData));
    };
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AuthServiceProvider);
export { AuthServiceProvider };
//# sourceMappingURL=auth-service.js.map