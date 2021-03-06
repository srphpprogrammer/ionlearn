import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthServiceProvider } from	'../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { HttpService } from  '../../providers/http-service/http-service';
import {Storage} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { ActivityPage } from '../activity/activity';
import { NavParams } from 'ionic-angular';
import * as AppConfig from '../../app/app.config';

/**
 * Generated class for the ProfiePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profie',
  templateUrl: 'profie.html',
})


export class ProfiePage {

 
  private formData: FormGroup;
  public error: string = "";

  about: any;
  profname: any;
  location: any;
  profile: any = {};
  imgUrl: any;
  config:any;
  constructor(
  	public navCtrl: NavController,
  	public authService: AuthServiceProvider,
  	public formBuilder: FormBuilder,
    public httpService: HttpService,
    public alertCtrl: AlertController,
    private storage: Storage,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private transfer: Transfer,private camera: Camera,


  	) {

          this.config = AppConfig.config;
      this.imgUrl = this.config.imgUrl;
    if(navParams.get('user')){
      let pdata: any  = navParams.get('user');
      this.profile.name = pdata.name;
      this.profile.profile_image = pdata.profile_image;
      this.profile.about = pdata.brights;

    }else{



     this.httpService.get(this.config.apiUrl+"auth/mobprofile",{})
     .map(data => data.json())
    .subscribe(
      data => {
        this.profile.name = data.name;
        this.profile.profile_image = data.profile_image;
        this.profile.about = data.brights;
      },

      error => {

      });


/*
       this.httpService.post("http://localhost/asker/laralearn/public/api/auth/profile",{
      about: this.about,
      profname: this.profname,
    }).subscribe(

      data => {

        this.profile.name = data.name;
        this.profile.profile_image = data.profile_image;
        this.profile.about = data.brights;

      },

      error => {
      
      });*/


    }




/*    this.formData = this.formBuilder.group({
      about: ['', Validators.required],
      //location: ['', Validators.compose([Validators.required])],
      profname: ['', Validators.required],
    });*/
     



   // let data = this.authService.checkAuth();
 //   console.log(data+"54656565");
  }

  editProfile(){
     this.navCtrl.push('EditprofilePage');
  }

  
   ionViewDidLoad() {
    this.menuCtrl.enable(true);
  }
  ionViewDidLeave(){
  //  this.menuCtrl.enable(true);
  }


  ionViewOnLoad() {
       this.menuCtrl.enable(true);


  }


    



  }



