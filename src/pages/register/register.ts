import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import {Observable} from "rxjs/Rx";
import { Http , Response, Headers, RequestOptions} from '@angular/http';

import { LoginPage } from '../login/login';

import { UserService } from '../../providers/user-service';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [UserService]
})
export class RegisterPage {
  account = {};
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    let home = this.modalCtrl.create(LoginPage);
    let loading = this.loadingCtrl.create();

    loading.present();
    console.log("Email ",this.account['email']);
    console.log("Password ", this.account['password']);
    this.userService.save(this.account).subscribe(data => { 
      console.log("save" + data);
      home.present();
      loading.dismiss();
    },
    error => {
      console.log("error creating account");
      loading.dismiss();
    });
  }

}
