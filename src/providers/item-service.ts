import { Injectable } from '@angular/core';
import { Http , Response, Headers, RequestOptions} from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";
/*
  Generated class for the ItemService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ItemService {

    HOST_URL : String;
      public data: any;

      constructor(public http: Http) {
        console.log('Hello ItemService Provider');
        this.HOST_URL = 'http://1-dot-fin-planer.appspot.com/';
      }

      loadItemByTripKey(tripKey){

         let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.HOST_URL+'findPackingListByTripKey?tripKey='+tripKey, headers)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     
      }

      loadSuggestItem(){
           return new Promise(resolve => {
          this.http.get(this.HOST_URL+'listAllItem')
          .map(res => res.json())
            .subscribe(data => {
              console.log(data);
              this.data = data;
              resolve(this.data);
            });
          });
      }

      saveNewItem(item: Object) {
        console.log("calling saveNewItem() in service");
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(item);
        console.log(" "+body);
        return this.http.post(this.HOST_URL+'savePackingList', body, headers)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }


      deleteItem(packingKey) {
        console.log("calling deleteTodo() in service");
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.get(this.HOST_URL+'deletePackingList?packingKey='+packingKey, headers)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }


}
