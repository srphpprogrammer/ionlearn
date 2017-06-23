import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthServiceProvider } from	'../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { HttpService } from  '../../providers/http-service/http-service';
import {Storage} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

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

  fname: any;
  lname: any;
  location: any;

  constructor(
  	public navCtrl: NavController,
  	public authService: AuthServiceProvider,
  	public formBuilder: FormBuilder,
    public httpService: HttpService,
    public alertCtrl: AlertController,
    private storage: Storage,
    private transfer: Transfer,private camera: Camera																																																																														
  	) {

    this.formData = this.formBuilder.group({
      fname: ['', Validators.required],
      location: ['', Validators.compose([Validators.required])],
      lname: ['', Validators.required],
    });
     



   // let data = this.authService.checkAuth();
 //   console.log(data+"54656565");
  }

  save(){

    this.httpService.post("http://localhost/asker/laralearn/public/api/profile",{
      fname: this.fname,
      lname: this.lname,
      location: this.location
    }).subscribe(

      data => {
          let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Yes, Really! :)',
            buttons: ['OK']
          });
          alert.present()
      },

      error => {
        console.log("error")
        if(error.status == 500){
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Invalid Username or Password',
            buttons: ['OK']
          });
          alert.present()
          //this.error = "Username already exists"
        }else{
          this.error = "Something went wrong. Please try again"
        }

      });
  }

  ionViewDidLoad() {
    console.log("In Profile Page");
  }


upload()
    {
      
       let options = {

           quality: 100
            };


      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:

     const fileTransfer: TransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
         fileKey: 'file',
         fileName: 'name.jpg',
         headers: {}
      
      }

  fileTransfer.upload(imageData, 'http://localhost/asker/laralearn/public/api/profile', options1)
   .then((data) => {
     // success
     alert("success");
   }, (err) => {
     // error
     alert("error"+JSON.stringify(err));
   });


    });

 
}




  }



