import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams } from 'ionic-angular';
import { TodoService} from'../../providers/todo-service';
import { TodoPage } from '../todo/todo';
/*
  Generated class for the Newtodo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-newtodo',
  templateUrl: 'newtodo.html',
  providers : [TodoService]
})
export class NewtodoPage {
  suggesttodos : any;
  newtodo = {};
  tripName : String;
  constructor( public loadingCtrl: LoadingController,
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private todoService : TodoService) {
      this.loadSuggestToDo();
      this.tripName = window.localStorage.getItem('tripName');
  }

  loadSuggestToDo(){
    this.todoService.loadSuggestToDoBySuggestTripKey(window.localStorage.getItem("suggestedTripsKey")).then(data => {
        console.log(data);
        this.suggesttodos = data;
      });
  }

  saveNewTodo(){
    let loading = this.loadingCtrl.create();
    loading.present();

    this.newtodo['tripKey'] = window.localStorage.getItem("tripKey");

    // 0 : Not done 1: Done
    this.newtodo['status'] = 0;

    console.log(this.newtodo);
    this.todoService.saveNewToDo(this.newtodo).subscribe(data => { 
      if(JSON.stringify(data) == '-1'){
          loading.dismiss();
      }else{
          console.log("Save todo success...");
          this.navCtrl.push(TodoPage);
          loading.dismiss();
      }
    },error => {
      console.log("Something wrong!!!");
      loading.dismiss();
    });

  }

  onselectSuggestTodo(suggesttodo : Object){
    console.log('onselectSuggestTodo : '+ suggesttodo['name']);
      this.newtodo['name'] = suggesttodo['name'];
  }
 
}



