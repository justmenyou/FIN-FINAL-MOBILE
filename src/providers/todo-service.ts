import { Injectable } from '@angular/core';
import { Http , Response, Headers, RequestOptions} from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";
/*
  Generated class for the TodoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TodoService {

      HOST_URL : String;
      public data: any;

      constructor(public http: Http) {
        console.log('Hello TripService Provider');
        this.HOST_URL = 'http://1-dot-fin-planer.appspot.com/';
      }

      loadTodoByTripKey(tripKey){

         let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.HOST_URL+'findTodoByTripKey?tripKey='+tripKey, headers)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     
      }

      loadSuggestToDoBySuggestTripKey(suggestTripKey){
           return new Promise(resolve => {
          this.http.get(this.HOST_URL+'findSuggestToDoBySuggestTripKey?suggestTripKey='+suggestTripKey)
          .map(res => res.json())
            .subscribe(data => {
              console.log(data);
              this.data = data;
              resolve(this.data);
            });
          });
      }

      saveNewToDo(todo: Object) {
        console.log("calling saveNewToDo() in service");
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(todo);
        console.log(" "+body);
        return this.http.post(this.HOST_URL+'saveTodo', body, headers)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }


      deleteTodo(todoKey) {
        console.log("calling deleteTodo() in service");
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.get(this.HOST_URL+'deleteTodo?todoKey='+todoKey, headers)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }


}
