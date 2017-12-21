import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Record page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-record',
  templateUrl: 'record.html'
})
export class RecordPage {
timerReady : any;
loadTimer : any;
  constructor(public navCtrl: NavController) {
    
  }

adData(){
  var hms = this.timerReady; 
  var a = hms.split(':'); 
  var seconds = (+a[0]) * 60 * 60 + (+a[1]);
  console.log(seconds);
  this.loadTimer = seconds;
  window.localStorage.setItem('time',this.loadTimer);
}
}
