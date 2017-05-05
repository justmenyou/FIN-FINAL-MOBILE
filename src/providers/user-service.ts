import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http , Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Rx";

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
  HOST_URL : String;
 public data:any;
  constructor(public http: Http) {
    console.log('Hello UserService Provider');
    this.HOST_URL = 'http://1-dot-fin-planer.appspot.com/';
  }

  save(item: Object) {
    console.log("calling save() in service");
    let headers = new Headers({ 'Content-Type': 'application/json' });
  
    let body = JSON.stringify(item);
    console.log(" "+body);
    return this.http.post(this.HOST_URL+'saveUser', body, headers)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  login(account: Object) {
    console.log("calling Login() in service");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(account);

      return this.http.post(this.HOST_URL+'loginMobile', body, headers)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }
}
