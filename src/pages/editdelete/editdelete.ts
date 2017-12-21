import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { EditsPage } from '../edits/edits'; 
import { AngularFire, FirebaseListObservable } from 'angularfire2'; 

/*
  Generated class for the Editdelete page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editdelete',
  templateUrl: 'editdelete.html'
})
export class EditdeletePage {

recStations : FirebaseListObservable<any>;
  eStation ={
    id:'',
    est:'',
    eName: '',
    eLatitude: '',
    eLongitude:'',
    eplugs:'',
    eImage:'',
    ephone:'',
    eemail:'',
    eaddress:''
  };
  loader:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public angF: AngularFire,
              public alertCtrl:AlertController,
              private loadingCtrl: LoadingController) {
                this.recStations = angF.database.list('/Locations');
                this.initForm();
                console.log(this.eStation.eName);
              }
 
 initForm(){
                this.eStation.id = this.navParams.get('key');
                this.eStation.est = this.navParams.get('sst');
                this.eStation.eName = this.navParams.get('sName');
                this.eStation.eLatitude = this.navParams.get('slatitude');
                this.eStation.eLongitude = this.navParams.get('slongitude');
                this.eStation.eplugs = this.navParams.get('splugs');
                this.eStation.eImage = this.navParams.get('sImage');
                this.eStation.ephone = this.navParams.get('sphone');
                this.eStation.eemail = this.navParams.get('semail');
                this.eStation.eaddress = this.navParams.get('saddress');
 }

  editStations():void{
    this.showLoading();
    if(this.eStation.est==undefined || this.eStation.est==''||this.eStation.eName==undefined || this.eStation.eName==''||this.eStation.eLatitude==undefined||this.eStation.eLatitude==''||this.eStation.eLongitude==undefined||this.eStation.eLongitude==''
    ||this.eStation.eplugs==undefined||this.eStation.eplugs==''||this.eStation.eImage==undefined||this.eStation.eImage==''||this.eStation.ephone==undefined||this.eStation.ephone==''
    ||this.eStation.eemail == undefined || this.eStation.eemail==''|| this.eStation.eaddress == undefined || this.eStation.eaddress ==''){
      this.showAlert('Error!','One or more fields are empty!');
    }
    else{
      if(this.validateLatLng(this.eStation.eLatitude,this.eStation.eLongitude)){
    this.recStations.update(this.eStation.id,{
      type:this.eStation.est,
      latitude:this.eStation.eLatitude,
      longitude:this.eStation.eLongitude,
      plugs:this.eStation.eplugs,
      name:this.eStation.eName,
      phone : this.eStation.ephone,
      email:this.eStation.eemail,
      address : this.eStation.eaddress,
      image:this.eStation.eImage
    });
    this.showAlert('Success','Successfully updated!');
    this.navCtrl.setRoot(EditsPage);
  }
  else{
        this.showAlert('Error','Please enter valid coordinates!')
      }
    }
  }
  
  deleteStations(){
    let prompt = this.alertCtrl.create({
      title:'Delete Stations',
      message: "Do you want delete?",
      buttons:[
        {
          text:"Cancel",
          handler : data => {
            console.log("Cancel clicked");
          }
        },
        {
          text:"Delete Station",
          handler:data =>{
            this.recStations.remove(this.eStation.id);
          }
        }
      ]
    });
    prompt.present();
    this.navCtrl.setRoot(EditsPage);
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDeletePage');
  }
  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }
  showAlert(Title,message) {
    setTimeout(() => {
        this.loader.dismiss();
      });
    let alert = this.alertCtrl.create({
      title: Title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();

  }
  validateLatLng(lat,lng){
    if(lat !==''||lng !==''){
      var lat2 = isNaN(lat);
      var lng2 = isNaN(lng);
      if(lat2==false && lng2==false){
        var latn = parseFloat(lat);
        var lngn = parseFloat(lng);
        if((latn<=85&&latn>=-85)&&(lngn<=180&&lngn>=-180)){
          console.log(lat2,lng2,latn,lngn);
          return true;
        }
        else{
          console.log("InValid lat long");
          return false;
        }
      }
    }
  }

}
