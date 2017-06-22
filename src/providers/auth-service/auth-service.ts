import { Injectable } from '@angular/core';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {UserModel} from '../../models/user.model';
import * as AppConfig from '../../app/app.config';
import 'rxjs/add/operator/catch';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  public config: any;
  constructor(
  	public http: Http
  	) {
  	this.config = AppConfig.config;
  }

  isLoggedIn(){
  	return null;
  }

  register(userData: UserModel){
    //register(userData): Observable<UserModel[]>{
    return this.http.post(this.config.apiUrl+this.config.user.register,JSON.stringify(userData));
  }


  login(email: string,password: string){
    return this.http.post(this.config.apiUrl+this.config.user.login,JSON.stringify({
      email:email,
      password:password
     }));
  }

/*
  checkAuth(){, Headers
    let headers = new Headers();
    headers.append('Authorization: Bearer ', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdC9hc2tlci9sYXJhbGVhcm4vcHVibGljL2FwaS9hdXRoL3JlZ2lzdGVyIiwiaWF0IjoxNDk3OTQxOTg5LCJleHAiOjE0OTc5NDU1ODksIm5iZiI6MTQ5Nzk0MTk4OSwianRpIjoiWGNrMVVxaXoxSkxjeGRrYiJ9.-I7MC3bvWZ3q20CvrsNvt5yTnk3HFDtcKjBo4PevxkY');

    return this.http.get(this.config.apiUrl+this.config.user.verify,{ headers: headers });
  }
*/




/*
  extractData(res:Response){
    let body = res.json();
    return body || [];
  }
.map(response => response.json());


*/




}
