var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ProfiePage } from '../pages/profie/profie';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { AuthGuardProvider } from '../providers/auth-guard/auth-guard';
var AppModule = (function () {
    function AppModule(navCtrl, storage) {
        this.navCtrl = navCtrl;
        this.storage = storage;
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            ProfiePage
        ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(MyApp),
            IonicStorageModule.forRoot(),
            HttpModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            ProfiePage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            AuthServiceProvider,
            AuthGuardProvider,
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        Storage])
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map