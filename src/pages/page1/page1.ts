import { Component } from '@angular/core';
import { NewtripsPage } from '../newtrips/newtrips';
import { NavController } from 'ionic-angular';
import { TripsPage} from'../trip/trip';
import { LoginPage} from'../login/login';
import {TripService} from '../../providers/trip-service';
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [TripService]
})
export class Page1 {
  user = {
   
  };
  newtripsPage = NewtripsPage;
  tripsPage = TripsPage;

  public trips: any; 

  constructor(public navCtrl: NavController,public tripService: TripService) {

      this.user = JSON.parse(window.localStorage.getItem('user'));
      window.localStorage.setItem('userKey',this.user['keyString']);
      this.loadTrips();
  }

  loadTrips(){
      console.log('Call load trip method : user >> '+this.user['keyString']);
      this.tripService.load(this.user['keyString']).then(data => {
        console.log(data);
        this.trips = data;
      });
  }

  doRefresh(refresher) {
    console.log('Loading your trip', refresher);
    this.loadTrips();
    refresher.complete();
  }

  goToTripDetail(trip){
     this.navCtrl.push(TripsPage, { trip: trip });
  }

  removeTrip(trip : Object){
     this.tripService.delete(trip['keyString']).subscribe(data => {
        console.log('delete trip success');
      });

      this.navCtrl.push(Page1);
  }
  logout(){
    console.log('Logout ');
    window.localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }
}
