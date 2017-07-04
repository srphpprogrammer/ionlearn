import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { HttpService } from  '../../providers/http-service/http-service';
import {Storage} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import * as AppConfig from '../../app/app.config';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { NavParams } from 'ionic-angular';
import { AuthServiceProvider } from	'../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { ActivityPage } from '../activity/activity';

/**
 * Generated class for the EditprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
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
    private storage: Storage,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private transfer: Transfer,private camera: Camera,
    public alertCtrl: AlertController,
  	) {


    this.formData = this.formBuilder.group({
      about: ['', Validators.required],
      location: ['', Validators.compose([Validators.required])],
      profname: ['', Validators.required],
    });
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }
save(){

    this.httpService.post("http://localhost/asker/laralearn/public/api/auth/profile",{
      about: this.about,
      profname: this.profname,
    }).subscribe(

      data => {
          let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Profile has been successfully updated',
            buttons: ['OK']
          });
          alert.present().then((data) => {
          this.navCtrl.push(ActivityPage);

        });
      },

      error => {
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Something went wrong. Please try again',
            buttons: ['OK']
          });
          alert.present()
      });
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
