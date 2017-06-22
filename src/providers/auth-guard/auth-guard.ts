import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import { NavController } from 'ionic-angular';
//import { ProfiePage } from '../../pages/profie/profie';

/*
  Generated class for the AuthGuardProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthGuardProvider {

	  constructor(public http: Http,
			 private storage: Storage,
			 public navCtrl: NavController																																													
	  	) {
	    console.log('Hello AuthGuardProvider Provider');
	  }
	 

	canActivate() {
/*	    if (this.storage.get('user')) {
	        return true;
	    }
	    // not logged in so redirect to login page
	    this.navCtrl.push(ProfiePage);
	    return false;*/
	}


}

