import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

import { ProfiePage } from '../profie/profie';
import { AlertController } from 'ionic-angular';

import { AuthServiceProvider } from	'../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'signup-home',
  templateUrl: 'signup.html',
})

export class SignupPage {

  private formData: FormGroup;
  public error: string = "";

  constructor(
  	public navCtrl: NavController,
  	public authService: AuthServiceProvider,
  	public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private storage: Storage																																																											
  	) {
    this.formData = this.formBuilder.group({
      //name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.required],
    });
  
    this.storage.get('token').then((isLoggedIn) => {
        if(isLoggedIn !== null){
        this.navCtrl.push(ProfiePage);
        }
 
    });


  }

  register(){

    this.authService.register(this.formData.value)
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

    }


  saveData(data: any) {
    let rs = data.json();
    this.storage.set("user", rs.user);
    this.storage.set("token", rs.token);
  }



}
