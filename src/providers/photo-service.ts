import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser'
import { Http , Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the PhotoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PhotoService {

  public data: any;
  constructor(public http: Http) {
    console.log('Hello PhotoService Provider');
  }


  uploadUrl() {
    return new Promise(resolve => {
      this.http.get('http://1-dot-fin-planer.appspot.com/createUploadImage')
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.data = data;
        resolve(this.data);
      });
    });
  }

   findPhotoByTripKey(tripKey) {
    return new Promise(resolve => {
      this.http.get('http://1-dot-fin-planer.appspot.com/findPhotoByTripKey?tripKey='+tripKey)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.data = data;
        resolve(this.data);
      });
    });
  }


  saveImage(photo: Object) {
      console.log("calling save() in service");
      let headers = new Headers({'Content-Type':'application/json'});
      let options = new RequestOptions({headers: headers});
      let body = JSON.stringify(photo);
      console.log(" "+body);
      return this.http.post('http://1-dot-fin-planer.appspot.com/savePhoto', body, headers)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

}
