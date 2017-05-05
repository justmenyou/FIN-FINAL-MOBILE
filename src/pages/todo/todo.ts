import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams } from 'ionic-angular';
import { NewtodoPage} from'../newtodo/newtodo';
import { TodoService} from'../../providers/todo-service';
/*
  Generated class for the Todo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
  providers : [TodoService]
})
export class TodoPage {
  newtodoPage = NewtodoPage;

  todos : any;

  constructor(public navCtrl: NavController, private navParams: NavParams, private todoService : TodoService,public loadingCtrl: LoadingController) {
      
     console.log("TodoPage Get info: "+window.localStorage.getItem("tripKey"));
     this.loadToDoByByTripKey();
  }

  loadToDoByByTripKey(){
      let loading = this.loadingCtrl.create();
      loading.present();

      this.todoService.loadTodoByTripKey(window.localStorage.getItem("tripKey")).subscribe(data => {
          console.log(data);
          this.todos = data;
           loading.dismiss();
      },error => {
        console.log("loadToDoByByTripKey fail!!!");
        loading.dismiss();
      });
  }

  goToNewTodo(trip){
     this.navCtrl.push(NewtodoPage);
  }

  done(todo : Object){
    console.log("Click done : "+todo);
      
    let loading = this.loadingCtrl.create();
    loading.present();

    let changeTodo = {};
    changeTodo['keyString'] =  todo['keyString'];
    changeTodo['name'] =  todo['name'];
    changeTodo['suggestToDoKey'] = todo['suggestToDoKey'];
    changeTodo['tripKey'] = todo['tripKey'];
    changeTodo['status'] = 1;

    console.log(changeTodo);
    this.todoService.saveNewToDo(changeTodo).subscribe(data => { 
      if(JSON.stringify(data) == '-1'){
          loading.dismiss();
      }else{
          console.log("Update todo status to done success...");
          this.navCtrl.push(TodoPage);
          loading.dismiss();
      }
    },error => {
      console.log("Something wrong!!!");
      loading.dismiss();
    });

  
  }

  undone(todo){
       console.log("Click undone : "+todo);

       let loading = this.loadingCtrl.create();
        loading.present();

        let changeTodo = {};
        changeTodo['keyString'] =  todo['keyString'];
        changeTodo['name'] =  todo['name'];
        changeTodo['suggestToDoKey'] = todo['suggestToDoKey'];
        changeTodo['tripKey'] = todo['tripKey'];
        changeTodo['status'] = 0;

        console.log(changeTodo);
        this.todoService.saveNewToDo(changeTodo).subscribe(data => { 
          if(JSON.stringify(data) == '-1'){
              loading.dismiss();
          }else{
              console.log("Update todo status to undone success...");
              this.navCtrl.push(TodoPage);
              loading.dismiss();
          }
        },error => {
          console.log("Something wrong!!!");
          loading.dismiss();
        });
  }

  removeToDo(todo){
       console.log("Click remove : "+todo);

        let loading = this.loadingCtrl.create();
        loading.present();

        console.log(todo['keyString']);
        this.todoService.deleteTodo(todo['keyString']).subscribe(data => { 
          if(JSON.stringify(data) == '-1'){
              loading.dismiss();
          }else{
              console.log("Delete todo success...");
              this.navCtrl.push(TodoPage);
              loading.dismiss();
          }
        },error => {
          console.log("Something wrong!!!");
          loading.dismiss();
        });
  }

  doRefresh(refresher) {
    console.log('Loading your todo', refresher);
    this.loadToDoByByTripKey();
    refresher.complete();
  }


}
