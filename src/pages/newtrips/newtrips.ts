import { Component } from '@angular/core';
import { NavController, AlertController,
ActionSheetController,LoadingController } from 'ionic-angular';
import {SuggesttripService} from '../../providers/suggesttrip-service';
import {TripService} from '../../providers/trip-service';
import {Observable} from "rxjs/Rx";
import {Response} from '@angular/http';
import { Page1 } from '../page1/page1';
import { TripsPage } from '../trip/trip';

/*
  Generated class for the Newtrips page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-newtrips',
  templateUrl: 'newtrips.html',
  providers: [SuggesttripService,TripService],
  
})
export class NewtripsPage {
  page1 = Page1;
  trip = TripsPage;

  public suggesttrips: any; 
  newtrip = {};
  user = {};

 constructor(public navCtrl: NavController,
            public suggesttripService: SuggesttripService,
            public tripService: TripService,
            public alertCtrl: AlertController,
            public actionSheetCtrl: ActionSheetController,
            public loadingCtrl: LoadingController) { 
    
    this.newtrip["date"] = new Date().toISOString();
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.loadTrip();
  }

  loadTrip(){
    let loading = this.loadingCtrl.create({content: 'Please wait...'});
    loading.present();
    this.suggesttripService.load().then(data => {
    loading.dismiss();
      this.suggesttrips = data;
    });
  }

  saveNewTrip(){

    let loading = this.loadingCtrl.create();
    loading.present();

    this.newtrip['userKey'] = this.user["keyString"];

    console.log(this.newtrip);
    this.tripService.save(this.newtrip).subscribe(data => { 
      if(JSON.stringify(data) == '-1'){
          loading.dismiss();
      }else{
          console.log("Save trip success...");
          this.navCtrl.push(Page1);
          loading.dismiss();
      }
    },error => {
      console.log("Something wrong!!!");
      loading.dismiss();
    });
    
  }

  onselectSuggestTrip(suggesttrip : Object){
      console.log('onselectSuggestTrip : '+ suggesttrip['name']);
      this.newtrip['name'] = suggesttrip['name'];
  }

}
