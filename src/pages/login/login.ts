import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { Page1} from'../page1/page1';
import { RegisterPage} from'../register/register';
import { UserService } from '../../providers/user-service';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService]
})
export class LoginPage {
  account = {};
  page1 = Page1;
  registerPage = RegisterPage;
public member = {};


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController) {

      if(window.localStorage.getItem('user') != null){
        this.navCtrl.setRoot(Page1);
      }

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
// ประกาศตัวแปรloading ที่เก็บตัวload
    let loading = this.loadingCtrl.create();

    loading.present();

    console.log("Email ",this.account['email']);
    console.log("Password ", this.account['password']);
// เรียกใช้ service 
    this.userService.login(this.account).subscribe(data => { 

      if(JSON.stringify(data) == '400'){

          console.log("Email or Password is incorrect");
          loading.dismiss();
          // Alert warning box here
            this.presentAlert();
      }else{

          window.localStorage.setItem('user',JSON.stringify(data));
          console.log(window.localStorage.getItem('user'));
          this.navCtrl.setRoot(Page1);
          loading.dismiss();
      }
      
      
    },
    error => {
     
      console.log("Email or Password is incorrect");
      loading.dismiss();
       this.presentAlert();
    });
    
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Email or Password is incorrect',
    subTitle: 'Please try again!!!',
    buttons: ['OK']
  });
  alert.present();
}
}
