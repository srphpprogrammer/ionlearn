var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { ProfiePage } from '../profie/profie';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Storage } from '@ionic/storage';
var HomePage = (function () {
    function HomePage(navCtrl, authService, formBuilder, alertCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.error = "";
        this.formData = this.formBuilder.group({
            //name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
        });
        this.storage.get('token').then(function (isLoggedIn) {
            _this.navCtrl.push(ProfiePage);
            console.log('Is Logged in : ', _this.storage.get('user'));
        });
    }
    HomePage.prototype.register = function () {
        var _this = this;
        this.authService.register(this.formData.value)
            .subscribe(function (data) {
            _this.saveData(data);
            _this.navCtrl.push(ProfiePage);
        }, function (error) {
            if (error.status == 500) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: 'Email already Exists. Please try another',
                    buttons: ['OK']
                });
                alert_1.present();
                //this.error = "Username already exists"
            }
            else {
                _this.error = "Something went wrong. Please try again";
            }
        });
    };
    HomePage.prototype.saveData = function (data) {
        var rs = data.json();
        this.storage.set("user", rs.user);
        this.storage.set("token", rs.token);
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
    }),
    __metadata("design:paramtypes", [NavController,
        AuthServiceProvider,
        FormBuilder,
        AlertController,
        Storage])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map