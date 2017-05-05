import { Component } from '@angular/core';
import { NavController, AlertController,
ActionSheetController,NavParams,LoadingController } from 'ionic-angular';
import {TripService} from '../../providers/trip-service';
import {Observable} from "rxjs/Rx";
import {Response} from '@angular/http';
import { Page1 } from '../page1/page1';
import { TripsPage } from '../trip/trip';
/*
  Generated class for the Note page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
  providers : [TripService]
})
export class NotePage {
  
  tripNote : String;
  constructor(public navCtrl: NavController,
            public tripService: TripService,
            public alertCtrl: AlertController,
            public actionSheetCtrl: ActionSheetController,
            public loadingCtrl: LoadingController) { 
              console.log("note : "+window.localStorage.getItem('note'));
      this.tripNote = window.localStorage.getItem('note');
      console.log(this.tripNote);
      if(this.tripNote == 'null'){
        this.tripNote = '';
         // Nothing to show
      }

  }

  saveTrip(){
       let loading = this.loadingCtrl.create();
    loading.present();
    let trip = {};

     trip['keyString'] =  window.localStorage.getItem('tripKey');
     trip['name'] =  window.localStorage.getItem('tripName');
     trip['date']  = window.localStorage.getItem('date');
     trip['userKey'] = window.localStorage.getItem('userKey');
     trip['suggestedTripsKey'] = window.localStorage.getItem('suggestedTripsKey');
     trip['note'] = this.tripNote;

    console.log(trip);
    this.tripService.save(trip).subscribe(data => { 
      if(JSON.stringify(data) == '-1'){
          loading.dismiss();
      }else{
          console.log("Save trip note success...");
          this.navCtrl.push(Page1);
          loading.dismiss();
      }
    },error => {
      console.log("Something wrong!!!");
      loading.dismiss();
    });
  }

}
