import { IonicPage, NavController, NavParams, MenuController  } from 'ionic-angular';
import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

import { AlertController } from 'ionic-angular';

import { AuthServiceProvider } from  '../../providers/auth-service/auth-service';
import { HttpService } from	'../../providers/http-service/http-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Storage} from '@ionic/storage';
import { ProfiePage } from '../profie/profie';
//import { ActivityPage } from '../activity/activity';

/*
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private formData: FormGroup;
  public error: string = "";
  email: any;
  password: any;

  constructor(  	public navCtrl: NavController,
    public authService: AuthServiceProvider,
  	public httpService: HttpService,
  	public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private storage: Storage,		
    public navParams: NavParams,
    public menuCtrl: MenuController

    ) {

    this.formData = this.formBuilder.group({
      //name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.required],
    });
  
  	
  }


  login(){

    this.authService.login(this.email,this.password)
    .subscribe(

      data => {
            this.menuCtrl.swipeEnable(true, 'myMenu');

          this.saveData(data);
          this.navCtrl.setRoot('ActivityPage');
      },

      error => {
        if(error.status == 500){
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Invalid Username or Password',
            buttons: ['OK']
          });
          alert.present()
          //this.error = "Username already exists"
        }else{
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Invalid Username or Password',
            buttons: ['OK']
          });
          alert.present();
        }

      });
  }

  saveData(data: any) {
    let rs = data.json();
    this.storage.set("user", rs.user);
    this.storage.set("token", rs.token);
  }


  ionViewCanEnter(){
      this.httpService.isAuthenticated().then(data => {
        if(data === true){
           this.navCtrl.setRoot(ProfiePage);

        }else{
         return true;
        }
      });
  }

/*
       return this.storage.get('token').then((isLoggedIn) => {
      if(isLoggedIn !== null){
        return false;
      }
    }).catch(e=>{
      return true;
    }); this.authService.login(this.formData.value)
    .subscribe(

      data => {
          this.saveData(data);
          this.navCtrl.push(ProfiePage);

      },

      error => {
        if(error.status == 500){
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Email already Exists. Please try another',
            buttons: ['OK']
          });
          alert.present()
          //this.error = "Username already exists"
        }else{

          this.error = "Something went wrong. Please try again"
        }

      });

*/





}
