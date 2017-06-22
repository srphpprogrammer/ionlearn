import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import * as AppConfig from '../../app/app.config';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class HttpService {

  public config: any;
  constructor(
    public http: Http,
    private authHttp: AuthHttp
    ) {
    this.config = AppConfig.config;
  }


  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer asdsd'); 
    headers.append('Access-Control-Allow-Origin ', 'http://localhost:8100'); 
    headers.append('Access-Control-Allow-Methods ', ':GET, POST, PUT, DELETE, OPTIONS'); 
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  xpost(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    console.log(url);
    console.log(JSON.stringify(data));
    return this.http.post(url, JSON.stringify(data), {
      headers: headers
    });
  }


  post(url, data) {
  console.log(JSON.stringify(url));
  console.log(JSON.stringify(data));
    
   return this.authHttp.post(url,JSON.stringify(data));
  }




/*

  login(email: string,password: string){
    return this.xpost(this.config.apiUrl+this.config.user.login,{
      email:email,
      password:password,
    });
  }

*/



}