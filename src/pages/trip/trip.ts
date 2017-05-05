import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TodoPage} from'../todo/todo';
import { PackagePage} from'../package/package';
import { NotePage} from'../note/note';
import { PhotoPagePage} from'../photo-page/photo-page'

import { ImagePicker } from '@ionic-native/image-picker';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
/*
  Generated class for the ListTrips page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html'
})
export class TripsPage {
  todoPage = TodoPage;
  packagePage = PackagePage;
  notePage = NotePage;
  photoPage =  PhotoPagePage;

  trip = {};

  constructor(public navCtrl: NavController, private navParams: NavParams) {
      console.log(navParams.get('isReloadFromNotePage'));
      if(navParams.get('isReloadFromNotePage') != null){
            console.log('Do nothing');
      }else{
           console.log('Init trip data');
          this.trip = navParams.get('trip');
            window.localStorage.setItem('tripKey',this.trip['keyString']);
            window.localStorage.setItem('suggestedTripsKey',this.trip['suggestedTripsKey']);
            window.localStorage.setItem('tripName',this.trip['name']);
            window.localStorage.setItem('date',this.trip['date']);
            window.localStorage.setItem('note',this.trip['note']);
        console.log("TripsPage Get info: "+this.trip);
      }
  }

  goToToDoPage(){
      this.navCtrl.push(TodoPage); 
  }

  goToPackagePage(){
     this.navCtrl.push(PackagePage);
  }

}
