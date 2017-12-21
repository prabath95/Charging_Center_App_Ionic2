import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { ToastController, AlertController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-add-appointments',
  templateUrl: 'add-appointments.html'
})
export class AppointmentsPage {
  todayD
  todayT
  date: any;
  time: any;
  percentage: any;
  td: string;
  tp: string;
  loader: any;
  id :any;
  cName : any;


  items: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl: LoadingController, public angfire: AngularFire, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.items = angfire.database.list('/Appointment');
    this.todayD = new Date().toISOString();
    this.id = this.navParams.get('Id');
    this.cName = this.navParams.get('Name');

  }

showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }
  addApp(date, time, td, tp) {
    this.showLoading();
    if (this.date == undefined || this.date == '' || this.time == undefined || this.time == '' || this.td == undefined || this.td == '' || this.tp == undefined || this.tp == '') {
      this.showAlert('One or more fields can not be empty');
    }
    else if(this.date < this.todayD)
    {
      this.showAlert('Choose a valid date and Time');
    }
    //else if (this.time < )
    else {
      this.items.push({
        date: date,
        time: time,
        td: td,
        tp: tp,
        User: window.localStorage.getItem('email'),
        Name : this.cName,
        key : this.id,
      }).then(() => {
        let toast = this.toastCtrl.create({ message: 'Successfully Added', duration: 1000 });
        toast.present();
      })
      setTimeout(() => {
        this.loader.dismiss();
      });
    }
  }

  showAlert(message) {
    setTimeout(() => {
        this.loader.dismiss();
      });
    let alert = this.alertCtrl.create({
      title: 'Invalid data!!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
