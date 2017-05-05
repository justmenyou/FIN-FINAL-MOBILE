import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams } from 'ionic-angular';
import { ItemService} from'../../providers/item-service';
import { PackagePage } from '../package/package';

/*
  Generated class for the Newitem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-newitem',
  templateUrl: 'newitem.html',
  providers : [ItemService]
})
export class NewitemPage {

  suggestitems : any;

  newItem = {};
  constructor(public loadingCtrl: LoadingController,
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private itemService : ItemService)
   {
       this.loadSuggestItem();
   }

    loadSuggestItem(){
    this.itemService.loadSuggestItem().then(data => {
        console.log(data);
        this.suggestitems = data;
      });
  }

   saveNewItem(){
    let loading = this.loadingCtrl.create();
    loading.present();

    this.newItem['tripKey'] = window.localStorage.getItem("tripKey");

    // 0 : Not done 1: Done
    this.newItem['status'] = 0;

    console.log(this.newItem);
    this.itemService.saveNewItem(this.newItem).subscribe(data => { 
      if(JSON.stringify(data) == '-1'){
          loading.dismiss();
      }else{
          console.log("Save item success...");
          this.navCtrl.push(PackagePage);
          loading.dismiss();
      }
    },error => {
      console.log("Something wrong!!!");
      loading.dismiss();
    });

  }

  onselectSuggestItem(suggestitem : Object){
    console.log('onselectSuggestItem : '+ suggestitem['itemName']);
      this.newItem['itemName'] = suggestitem['itemName'];
  }
 
}
