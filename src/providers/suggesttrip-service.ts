import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http , Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Rx";
/*
  Generated class for the SuggesttripService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SuggesttripService {
  HOST_URL : String;
  data : any;
  constructor(public http: Http) {
    console.log('Hello SuggesttripService Provider');
    this.HOST_URL = 'http://1-dot-fin-planer.appspot.com/';
  }

  load() {
    return new Promise(resolve => {
      this.http.get(this.HOST_URL+'listAllSuggestedTrips')
      .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          this.data = data;
          resolve(this.data);
        });
      });
    }
    
}
