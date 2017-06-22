import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

import { ProfiePage } from '../profie/profie';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {


  constructor(
  	public navCtrl: NavController,
    private storage: Storage            
  	) {

 
    this.storage.get('token').then((isLoggedIn) => {
        if(isLoggedIn !== null){
        this.navCtrl.push(ProfiePage);
        }
 
    });

  }

  signup(){
    console.log("SignupPage Redirected");
    this.navCtrl.push(SignupPage);
  }

  login(){
    this.navCtrl.push(LoginPage);
  }


}
