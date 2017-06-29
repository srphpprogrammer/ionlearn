import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {AuthHttp} from 'angular2-jwt';
import { ProfiePage } from '../profie/profie';
import * as AppConfig from '../../app/app.config';

/**
 * Generated class for the ActivityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

	posts: any;
  config:any;
  imgUrl: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authHttp: AuthHttp,
    public menuCtrl: MenuController,
  	) {
    this.config = AppConfig.config;
    this.imgUrl = this.config.imgUrl;

  }

  ionViewDidLoad() {

  	  this.authHttp.get(this.config.apiUrl+"activity",{})
    .subscribe(

      data => {
      	this.posts = data.json()
      },

      error => {

      });

    this.menuCtrl.enable(true);

      console.log('ionViewDidLoad ActivityPage');

  }

  pushPage(page: any){

    this.navCtrl.push(ProfiePage,page);

  }

  ionViewDidLeave(){
 this.menuCtrl.enable(true);
  }


  ionViewOnLoad() {
       this.menuCtrl.enable(true);


  }


}
