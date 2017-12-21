import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { EditsPage } from '../edits/edits';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the Station page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-station',
  templateUrl: 'station.html'
})
export class StationPage {
  locations : FirebaseListObservable<any>;
  public StationName : any;
  public Slatitude : any;
  public Slongtitude : any;
  public st : any;
  public sphone: any;
  public semail : any;
  public sAddress : any;
  public splugs:any;
  public sImage : any;
  loader : any;
  pushPage;
  constructor(public navCtrl: NavController, 
              public angFire:AngularFire,
              public alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              ) {

    this.locations = angFire.database.list('/Locations');
    
  }
    navToEdits () {
    this.navCtrl.push(EditsPage);
  }

  addStation () {
    this.showLoading();
    if(this.st==undefined || this.st==''||this.Slatitude==undefined || this.Slatitude==''||this.Slongtitude==undefined||this.Slongtitude==''
    ||this.splugs==undefined||this.splugs==''||this.StationName==undefined||this.StationName==''||this.sphone==undefined||this.sphone==''
    ||this.semail == undefined || this.semail ==''|| this.sAddress == undefined || this.sAddress ==''||this.sImage== undefined ||this.sImage==''){
      this.showAlert('Error!','One or more fields are empty!');
    }
    else{
      if(this.validateLatLng(this.Slatitude,this.Slongtitude)){
        this.locations.push({type:this.st,
                        latitude:this.Slatitude,
                        longitude:this.Slongtitude,
                        plugs:this.splugs,
                        name:this.StationName,
                        phone : this.sphone,
                        email:this.semail,
                        address : this.sAddress,
                        image:this.sImage
                      });
                      this.showAlert('Success','Successfully Added!')
                      this.navCtrl.setRoot(EditsPage);
      }
      else{
        this.showAlert('Error','Please enter valid coordinates!')
      }      
    }
  }

  refreshPage(){
    this.st = '';
    this.StationName = '';
    this.Slatitude= '';
    this.Slongtitude = '';
    this.splugs = '';
    this.sImage = '';
    this.sphone= '';
    this.semail = '';
    this.sAddress = '';
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