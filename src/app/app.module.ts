import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Http,HttpModule} from '@angular/http';
import {Storage} from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ProfiePage } from '../pages/profie/profie';
import { ActivityPage } from '../pages/activity/activity';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { PhotosPage } from '../pages/photos/photos';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
  import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {IonicStorageModule} from '@ionic/storage';
import {HttpService} from '../providers/http-service/http-service';
//import { Storage } from '@ionic/storage';
//import { NavController } from 'ionic-angular';
//import { AuthGuardProvider } from '../providers/auth-guard/auth-guard';


let storage = new Storage({});

export function getAuthHttp(http) {
 return new AuthHttp(new AuthConfig({
     //headerName: 'Authorization',
     tokenName: 'token',
    noJwtError: true,
    tokenGetter: (() => storage.get('token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,HomePage,
    ProfiePage,
    SignupPage,
    LoginPage,
    ActivityPage,
    EditprofilePage,
    PhotosPage
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
    ProfiePage,
    PhotosPage,
    SignupPage,
    LoginPage,
    ActivityPage,
    EditprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,Transfer,Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    HttpService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ]
})

export class AppModule {


 

}
