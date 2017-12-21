import { Component } from '@angular/core';
import { NavController, AlertController,LoadingController } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import{ EditappoPage } from "../edit-appo/edit-appo"

@Component({
  selector: 'page-view-appointments',
  templateUrl: 'view-appointments.html'
})
export class ViewAppointmentsPage {
date:any;
items:FirebaseListObservable<any>;
showItem :any ;
loader: any;

constructor(public navCtrl: NavController, public angfire:AngularFire, public alerc: AlertController,private loadingCtrl: LoadingController) {
  this.showItem =[];
    this.loadAppointments();
  }

searchD(date)
{
  this.showLoading();
  this.items = this.angfire.database.list('Appointment', {
      query: {
        orderByChild: 'date',
        equalTo: date
      }
    });
  this.showItem=[];
  this.items.subscribe(items => {
        items.forEach(item => {
          if(item.User == window.localStorage.getItem('email')){
            this.showItem.push(item);
          }
        });});
     setTimeout(() => {
        this.loader.dismiss();
      });
}

editDetails(items){
  this.navCtrl.push(EditappoPage, {
    key: items.$key,
    sdate: items.date,
    stime: items.time,
    std: items.td,
    stp: items.tp
  });
}
 

  deleteDetails(itemsID):void{
  let prompt = this.alerc.create({
   title: 'Delete',
   message:'Do you want to delete?',
   
   buttons:[
     {
       text: "cancel",
       handler:data =>{
         console.log("Cancel Cliked");
       }
     },
     {
       text:"Delete",
       handler: data =>{
         this.items.remove(itemsID);
         this.loadAppointments();
       }
     }
   ]

  });
  prompt.present();
}

refreshPage()
{
  this.date=''
  this.loadAppointments();
}
loadAppointments(){
  this.showLoading();
  this.showItem=[];
  console.log(this.showItem);
  this.items=this.angfire.database.list('/Appointment');
  this.items.subscribe(items => {
        items.forEach(item => {
          if(item.User == window.localStorage.getItem('email')){
            this.showItem.push(item);
          }
        });});
            setTimeout(() => {
        this.loader.dismiss();
      });
}
    showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }
}
