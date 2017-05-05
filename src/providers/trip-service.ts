import { Injectable } from '@angular/core';
import { Http , Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

/*
  Generated class for the TripService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TripService {

  HOST_URL : String;
  public data: any;
  constructor(public http: Http) {
    console.log('Hello TripService Provider');
     this.HOST_URL = 'http://1-dot-fin-planer.appspot.com/';
  }

  load(userKey) {
    return new Promise(resolve => {
      this.http.get(this.HOST_URL+'findTripByUserKey?userKey='+userKey)
      .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          this.data = data;
          resolve(this.data);
        });
      });
    }

  save(trip: Object) {
    console.log("calling save() in service");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(trip);
    console.log(" "+body);
    return this.http.post(this.HOST_URL+'saveTrip', body, headers)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(tripKey) {
    console.log("calling save() in service");
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.get(this.HOST_URL+'deleteTrip?tripKey='+tripKey, headers)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
