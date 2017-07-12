import { Component } from '@angular/core';
import { File } from "@ionic-native/file";

//

import { IonicPage, NavController, MenuController, ActionSheetController, ToastController } from 'ionic-angular';
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
import { FilePath } from '@ionic-native/file-path';
import { BrowserModule } from '@angular/platform-browser';
import { Platform } from 'ionic-angular';
import { LoadingController,Loading } from 'ionic-angular';


declare var cordova: any; 

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
    public filePath: FilePath;

  about: any;
  profname: any;
  location: any;
  profile_image: any;
  profile: any = {};
  imgUrl: any;
  config:any;
  lastImage: string = null;
  loading: Loading;
  token: any;

  constructor(
  	public navCtrl: NavController,
  	public authService: AuthServiceProvider,
  	public formBuilder: FormBuilder,
    public httpService: HttpService,
    private storage: Storage,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private transfer: Transfer,
    private camera: Camera,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController, 
    public platform: Platform,
    public file: File,
    public loadingCtrl: LoadingController,
  	) {

  
     this.storage.get('token').then(token => {
      if (token !== null) {

        this.token = token;

      }
    }).catch(e => {
      return null;
    });

          this.config = AppConfig.config;
      this.imgUrl = this.config.imgUrl;

      
     this.httpService.get(this.config.apiUrl+"auth/mobprofile",{})
     .map(data => data.json())
    .subscribe(
      data => {
        this.profname = data.name;
        this.profile_image = data.profile_image;
        this.about = data.brights;
      },

      error => {

      });


    this.formData = this.formBuilder.group({
      about: ['', Validators.required],
    //  location: ['', Validators.compose([Validators.required])],
      profname: ['', Validators.required],
    });
     
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditprofilePage');
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


  public presentActionSheet() {
     let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
           this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
           this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


public uploadImage() {
  // Destination URL
  var url = this.config.apiUrl+"uploadimageapi";
  //;"http://yoururl/upload.php";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename},
    headers: {'Authorization':"Bearer "+this.token}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}
  public takePicture(sourceType) {
      // Create options for the Camera Dialog
      var options = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };
   
      // Get the data of an image
      this.camera.getPicture(options).then((imagePath) => {
        // Special handling for Android library
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
             this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
      }, (err) => {
        this.presentToast('Error while selecting image.');
      });

    }


  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  public presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
     

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }



}
