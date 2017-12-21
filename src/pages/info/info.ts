import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppointmentsPage } from '../add-appointments/add-appointments';
import { CheckinPage } from '../check-in/check-in';
/*
  Generated class for the Info page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  iStation ={
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
  public para1:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
                this.iStation.id = this.navParams.get('key');
                this.iStation.est = this.navParams.get('sst');
                this.iStation.eName = this.navParams.get('sName');
                this.iStation.eLatitude = this.navParams.get('slatitude');
                this.iStation.eLongitude = this.navParams.get('slongitude');
                this.iStation.eplugs = this.navParams.get('splugs');
                this.iStation.eImage = this.navParams.get('sImage');
                this.iStation.ephone = this.navParams.get('sphone');
                this.iStation.eemail = this.navParams.get('semail');
                this.iStation.eaddress = this.navParams.get('saddress');

   }

bookAppointment(){
  this.navCtrl.push(AppointmentsPage,{
    Id : this.iStation.id,
    Name : this.iStation.eName,
  })
}

Checkin()
{
  this.navCtrl.push(CheckinPage)
}
}

