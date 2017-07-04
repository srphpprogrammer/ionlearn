import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfiePage } from '../pages/profie/profie';
import { ActivityPage } from '../pages/activity/activity';
import { PhotosPage } from '../pages/photos/photos';
import { HttpService } from  '../providers/http-service/http-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, method?: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public auth: HttpService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.show();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'My Profile ', component: 'ProfiePage'},
      {title: 'My Feed ', component: 'ActivityPage'},
      {title: 'My Photos ', component: 'PhotosPage'},
      {title: 'Logout', component: 'HomePage', method: 'logout'}
    ];


/*      console.log(this.auth.isAuthenticated());
      if(this.auth.isAuthenticated()) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = HomePage;
      }
*/
        this.auth.isAuthenticated().then(data => {
          if(data === true){
           this.rootPage = ActivityPage;
          }else{
           this.rootPage = HomePage;
          }
        });

      });
  }


  openPage(page) {

    if (page.method && page.method === 'logout') {
      this.auth.logout();      
      this.nav.setRoot(HomePage);

    }

    if (page.component === 'ProfiePage') {
      this.nav.setRoot(ProfiePage);
    }
    if (page.component === 'ActivityPage') {
      this.nav.setRoot(ActivityPage);
    }
    if (page.component === 'PhotosPage') {
      this.nav.setRoot(PhotosPage);
    }
    // this.nav.push(page.component);

    //this.nav.setRoot(page.component);

  }


}

