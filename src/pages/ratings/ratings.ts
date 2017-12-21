import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Ratings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ratings',
  templateUrl: 'ratings.html'
})
export class ratingsPage {
  star: number = 0;
  comm: any;
  items: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public angfire: AngularFire, public toastCtrl: ToastController) {
    this.items = angfire.database.list('/Rate');
  }

 addRate(star, comm) {
    this.items.push({
      star: star,
      comm: comm
    }).then(() => {
      let toast = this.toastCtrl.create({message: 'Succesfully Added',duration: 1000});
      toast.present();
      //alert('Succesfully Added')})
    })
  }
  


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditdelPage');
  }

}