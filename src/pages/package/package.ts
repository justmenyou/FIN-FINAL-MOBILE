import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams } from 'ionic-angular';
import { NewitemPage} from'../newitem/newitem';
import { ItemService} from'../../providers/item-service';
/*
  Generated class for the PackageList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-package',
  templateUrl: 'package.html',
  providers : [ItemService]
})
export class PackagePage {
  newitemPage = NewitemPage;

  packings : any;
  
  constructor(public navCtrl: NavController, 
  private navParams: NavParams, private itemService : 
  ItemService,public loadingCtrl: LoadingController) {
    this.loadToDoByByTripKey();
  }

  loadToDoByByTripKey(){
      let loading = this.loadingCtrl.create();
      loading.present();

      this.itemService.loadItemByTripKey(window.localStorage.getItem("tripKey")).subscribe(data => {
          console.log(data);
          this.packings = data;
           loading.dismiss();
      },error => {
        console.log("loadToDoByByTripKey fail!!!");
        loading.dismiss();
      });
  }

   taked(item : Object){
    console.log("Click done : "+item);
      
    let loading = this.loadingCtrl.create();
    loading.present();

    let changeItem = {};
    changeItem['keyString'] =  item['keyString'];
    changeItem['itemName'] =  item['itemName'];
    changeItem['itemKey'] = item['itemKey'];
    changeItem['tripKey'] = item['tripKey'];
    changeItem['quantity'] = item['quantity'];
    changeItem['status'] = 1;

    console.log(changeItem);
    this.itemService.saveNewItem(changeItem).subscribe(data => { 
      if(JSON.stringify(data) == '-1'){
          loading.dismiss();
      }else{
          console.log("Update item status to taked success...");
          this.navCtrl.push(PackagePage);
          loading.dismiss();
      }
    },error => {
      console.log("Something wrong!!!");
      loading.dismiss();
    });

  
  }

  untake(item){
       console.log("Click undone : "+item);

       let loading = this.loadingCtrl.create();
        loading.present();

         let changeItem = {};
          changeItem['keyString'] =  item['keyString'];
          changeItem['itemName'] =  item['itemName'];
          changeItem['itemKey'] = item['itemKey'];
          changeItem['tripKey'] = item['tripKey'];
          changeItem['quantity'] = item['quantity'];
          changeItem['status'] = 0;


        console.log(changeItem);
        this.itemService.saveNewItem(changeItem).subscribe(data => { 
          if(JSON.stringify(data) == '-1'){
              loading.dismiss();
          }else{
              console.log("Update item status to untake success...");
              this.navCtrl.push(PackagePage);
              loading.dismiss();
          }
        },error => {
          console.log("Something wrong!!!");
          loading.dismiss();
        });
  }

  removeItem(item){
       console.log("Click remove : "+item);

        let loading = this.loadingCtrl.create();
        loading.present();

        console.log(item['keyString']);
        this.itemService.deleteItem(item['keyString']).subscribe(data => { 
          if(JSON.stringify(data) == '-1'){
              loading.dismiss();
          }else{
              console.log("Delete item success...");
              this.navCtrl.push(PackagePage);
              loading.dismiss();
          }
        },error => {
          console.log("Something wrong!!!");
          loading.dismiss();
        });
  }

  doRefresh(refresher) {
    console.log('Loading your item', refresher);
    this.loadToDoByByTripKey();
    refresher.complete();
  }

}
