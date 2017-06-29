import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

import { ProfiePage } from '../profie/profie';
import { ActivityPage } from '../activity/activity';
import {Storage} from '@ionic/storage';
import { HttpService } from  '../../providers/http-service/http-service';

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
    this.navCtrl.push(SignupPage);
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  ionViewCanEnter(){
   /* this.auth.isAuthenticated().then(data => {
      if(data === true){
        this.navCtrl.setRoot(ActivityPage);
      }
    });*/
  }

  ionViewOnLoad(){

   this.menuCtrl.enable(true);

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
