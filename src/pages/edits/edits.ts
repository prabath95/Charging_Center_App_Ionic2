import { Component } from '@angular/core';
import { NavController, NavParams , AlertController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { EditdeletePage } from '../editdelete/editdelete';
import { StationPage } from '../station/station';

/*
  Generated class for the Edits page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edits',
  templateUrl: 'edits.html'
})
export class EditsPage {
  Cstations : any;
  stationList : any;
  backupSList : any;
  locations2 :FirebaseListObservable<any>;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl:AlertController,
              public angFire:AngularFire) {
                this.locations2 = this.angFire.database.list('/Locations');
                this.locations2.subscribe(locations2 =>{
                  let stations = [];
                  locations2.forEach(location =>{
                    stations.push(location);
                  });
                  this.stationList = stations;
                  this.backupSList = stations;
                })
  }
  initStations(){
    this.stationList = this.backupSList;
  }
  getItems(searchbar){
    this.initStations();
    var q = searchbar.srcElement.value;

    if(!q) {
      return;
    }
    this.stationList=this.stationList.filter((v =>{
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    }));
    console.log(q, this.stationList.length);
  }


  editStation(stat):void{
    console.log(stat.$key);
    this.navCtrl.push(EditdeletePage,{
        key:stat.$key,
        sst:stat.type,
        sName:stat.name,
        slatitude:stat.latitude,
        slongitude:stat.longitude,
        splugs:stat.plugs,
        sImage:stat.image,
        sphone : stat.phone,
        semail:stat.email,
        saddress : stat.address
     });
  }
  navToStations(){
    this.navCtrl.push(StationPage)
  }

}
