import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, ActionSheetController, ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable} from "rxjs/Rx";
import { PhotoService } from '../../providers/photo-service';

/*
  Generated class for the PhotoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-photo-page',
  templateUrl: 'photo-page.html',
  providers : [PhotoService]
})
export class PhotoPagePage {
  
  public imageSrc : String;
  public photos : any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    private camera: Camera,
    private file: File,
    private transfer: Transfer,
    private http: HTTP,
    private photoService:PhotoService,
    public loadingCtrl: LoadingController) {

      this.loadPhotoByTripKey();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoPagePage');
  }


    loadPhotoByTripKey(){
          let loading = this.loadingCtrl.create({content: 'Please wait...'});
          loading.present();
          let tripKey = window.localStorage.getItem('tripKey');
          this.photoService.findPhotoByTripKey(tripKey).then(data => {
          loading.dismiss();
            this.photos = data;
          });
    }
  
    newphoto() {
     let actionSheet = this.actionSheetCtrl.create({
       title: 'Profile picture',
       buttons: [
         {
           text: 'Take a photo',
           handler: () => {
             console.log('take a photo clicked');
             this.openGallery(this.camera.PictureSourceType.CAMERA);
           }
         },
         {
           text: 'Select from camera roll',
           handler: () => {
             console.log('Select from camera roll clicked');
             this.openGallery(this.camera.PictureSourceType.PHOTOLIBRARY);
           }
         },
         {
           text: 'Cancel',
           role: 'cancel',
           handler: () => {
             console.log('Cancel clicked');
           }
         }
       ]
     });

     actionSheet.present();
   }

   private openGallery (sourceType): void {

      let options: CameraOptions = {
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        quality: 100
      }

      this.camera.getPicture(options).then((results) => {

          let tripKey = window.localStorage.getItem('tripKey');

          this.imageSrc = results;

          let loading = this.loadingCtrl.create({
            spinner: 'crescent'
          });

          loading.present();

          const fileTransfer: TransferObject = this.transfer.create();

          let filename = this.imageSrc.split('/').pop();
          let uploadOptions: FileUploadOptions = {
            fileKey: 'photo',
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params : {'tripKey': tripKey}

          };

          this.photoService.uploadUrl().then(data => {
          let url: any;
          url = data;
          fileTransfer.upload(results, url, uploadOptions)
            .then((entry) => {
                 alert("Upload image successfully.");
               
                
            },
            (err) => {
              alert(JSON.stringify(err));
             
            });
          },
          error => {
                alert(JSON.stringify(error));
          });
          loading.dismiss();

            
        },
        (err) => {
          console.log("error");
      });
    }


}
