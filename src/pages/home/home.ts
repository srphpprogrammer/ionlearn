import { Component } from '@angular/core';
import { NavController, MenuController,IonicPage } from 'ionic-angular';

//import { SignupPage } from '../signup/signup';
//import { LoginPage } from '../login/login';

//import { ProfiePage } from '../profie/profie';
//import { ActivityPage } from '../activity/activity';
import {Storage} from '@ionic/storage';
import { HttpService } from  '../../providers/http-service/http-service';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {


  constructor(
  	public navCtrl: NavController,
    private storage: Storage,
    public auth: HttpService,
    public menuCtrl: MenuController,
    
  	) {

  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

  login(){
    this.navCtrl.push('LoginPage',{animate: false, direction: 'forward'});
  }

  ionViewCanEnter(){
   /* this.auth.isAuthenticated().then(data => {
      if(data === true){
        this.navCtrl.setRoot(ActivityPage);
      }
    });*/
  }

  ionViewOnLoad(){


  }


ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false, 'myMenu');
  }

/*  


   if(this.auth.isAuthenticated()) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }  
    this.storage.get('token').then((isLoggedIn) => {
        if(isLoggedIn !== null){
        this.navCtrl.push(ProfiePage);
        }
 
    }).catch(e=>{

      console.log("error");
    });*/

  



}
