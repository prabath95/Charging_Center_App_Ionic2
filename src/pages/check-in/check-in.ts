import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ratingsPage } from '../ratings/ratings';
//import { TimeplugPage } from "../timeplug/timeplug";

/*
  Generated class for the CheckIn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-check-in',
  templateUrl: 'check-in.html'
})
export class CheckinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }
   goToOtherPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(ratingsPage);
   }
    //goToTimep()
   // {
   //   this.navCtrl.push(TimeplugPage);
  //  }
  

}