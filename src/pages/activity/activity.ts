import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {AuthHttp} from 'angular2-jwt';
import { ProfiePage } from '../profie/profie';
import * as AppConfig from '../../app/app.config';
import { HttpService } from  '../../providers/http-service/http-service';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import Pusher from 'pusher-js'
import {Storage} from '@ionic/storage';

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

/*animations: [
 
  
    trigger('fadeIn', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('visible <=> invisible', animate('200ms linear'))
    ]),
 
   
 
  ]*/

})
export class ActivityPage {

	posts: any;
  config:any;
  imgUrl: any;
  update: any;
  token: any;
  private formData: FormGroup;
  fadeState: String = 'visible';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authHttp: AuthHttp,
    public menuCtrl: MenuController,
    public httpService: HttpService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private storage: Storage
  	) {
    this.config = AppConfig.config;
    this.imgUrl = this.config.imgUrl;

    this.formData = this.formBuilder.group({
      update: ['', Validators.compose([Validators.required])],
    });
  
     this.storage.get('token').then(token => {
      if (token !== null) {

        this.token = token;

      }
    }).catch(e => {
      return null;
    });




  }
 toggleFade() {
    this.fadeState = (this.fadeState == 'visible') ? 'invisible' : 'visible';    
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

  postStatus(){

    this.httpService.post(this.config.apiUrl+"status",{
      update: this.update
    }).map(
      data => data.json()
    ).subscribe(

      data => {

       console.log({
         content:data.content,
         user:data.user,
         created_at:data.created_at
       });

       this.posts.unshift({
         content:data.content,
         user:data.user,
         created_at:data.created_at,
       });

      Pusher.logToConsole = false;


      var pusher = new Pusher('aa6903fb73621b6ca6d5', {
        encrypted: false,
        auth: {
          headers: { 
            Authorization: 'Bearer '+ this.token,
          }
        },
        authEndpoint: this.config.apiUrl+'mob/authcheck'
      });

    
      var channel = pusher.subscribe('private-larawall'+1);


      //console.log('private-larawall'+$rootScope.auth.user.id);
      channel.bind('newpost', function(data) {
         this.posts.unshift({
           content:data.content,
           user:data.user,
           created_at:data.created_at,
         });
      });









      },

      error => {
 if(error.status == 500){
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Some error occurred. Please try again',
            buttons: ['OK']
          });
          alert.present()
          //this.error = "Username already exists"
        }else{
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Some error occurred. Please try again',
            buttons: ['OK']
          });
          alert.present();
        }
      });
  }



}
