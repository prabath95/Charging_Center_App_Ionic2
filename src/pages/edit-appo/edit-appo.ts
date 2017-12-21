import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { ViewAppointmentsPage } from '../view-appointments/view-appointments';
/*
  Generated class for the EditAppo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-appo',
  templateUrl: 'edit-appo.html'
})
export class EditappoPage {

AppointmentList: FirebaseListObservable<any>;
Appointment = {
  id: '',
  rdate: '',
  rtime: '',
  rtd: '',
  rtp: ''
};

  constructor(public navCtrl: NavController,public af: AngularFire, public navParams: NavParams, public toastCtrl: ToastController) {
   this.AppointmentList = af.database.list('/Appointment');
   this.Appointment.id = this.navParams.get('key');
  this.Appointment.rdate = this.navParams.get('sdate');
  this.Appointment.rtime = this.navParams.get('stime');
  this.Appointment.rtd = this.navParams.get('std');
  this.Appointment.rtp = this.navParams.get('stp');
}

editApp(id,rdate,rtime,rtd,rtp)
{
  
  if(id) {
    this.AppointmentList.update(id, {
      date: rdate,
      time: rtime,
      td: rtd,
      tp: rtp
    }).then( newContact => {
      this.navCtrl.setRoot(ViewAppointmentsPage);
      let toast = this.toastCtrl.create({message: 'Succesfully Added',duration: 1000});
      toast.present();
    }, error => {
      console.log(error);
    });
  } 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditappoPage');
  }

}

