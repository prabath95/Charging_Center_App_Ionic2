import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the Details page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})


export class DetailsPage {
   loader: any; 
details:FirebaseListObservable<any>;
showDetails :any =[];
date : any;

constructor(public navCtrl:  NavController,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public angFire:AngularFire){
this.LoadDetails();

}


LoadDetails() {
  this.showLoading();
  this.showDetails=[];
  this.details=this.angFire.database.list('/Details');
  this.details.subscribe(items => {
        items.forEach(item => {
          if(item.user == window.localStorage.getItem('email')){
            this.showDetails.push(item);
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

addDetails():void{
  let prompt = this.alertCtrl.create({
   title: 'Alert',
   message:'Enter the appropriate Data',
   inputs:[
     {
       name:'myDate',
       placeholder: "Charging Date"
     },
     {
       name:'mytime',
       placeholder: "Charing Time"
     },
     {
       name:'MRStart',
       placeholder: "Meter Reading at Start"
     },
     {
       name:'MRend',
       placeholder: "Meter Reading at end "
     },
     {
       name:'Milage',
       placeholder: "Milage"
     },
     
      {
       name:'Average',
       placeholder: "Average"
     }
     
   ],
   buttons:[
     {
       text: "cancel",
       handler:data =>{
         console.log("Cancel Cliked");
       }
     },
     {
       text:"Save",
       handler: data =>{
         if(data.myDate==''||data.myDate==undefined||data.mytime==undefined||data.mytime==''||data.MRStart==undefined||data.MRStart==''
         ||data.MRend==undefined||data.MRend==''||data.Milage==''||data.Milage==undefined||data.Average==''||data.Average==undefined){
            
            this.showAlert('One or More Filds are Empty');

         }
         else{
         this.details.push({
           user: window.localStorage.getItem('email'),
           myDate:data.myDate,
           mytime:data.mytime,
           MRStart:data.MRStart,
           MRend:data.MRend,
           Milage:data.Milage,
           Average:data.Average
         });
         this.LoadDetails();
         }
       }
     }
   ]

  });
  
  prompt.present();
}
  editDetails(details):void{
  let prompt = this.alertCtrl.create({
   title: 'Edits',
   message:'You want to edit?',
   inputs:[
     {
       name:'myDate',
       placeholder: details.myDate
     },
     {
       name:'mytime',
       placeholder: details.mytime
     },
     {
       name:'MRStart',
       placeholder:details.MRStart 
     },
     {
       name:'MRend',
       placeholder: details.MRend
     },
     {
       name:'Milage',
       placeholder: details.Milage
     },
     
      {
       name:'Average',
       placeholder: details.Average
     }
     
   ],
   buttons:[
     {
       text: "cancel",
       handler:data =>{
         console.log("Cancel Cliked");
       }
     },
     {
       text:"Save",
       handler: data =>{
         let newMYDATE:Date=details.myDate;
          let newMYTIME:String=details.mytime;
           let newMRSTARTE:String=details.MRStart;
            let newMRENDE:String=details.MRend;
             let newMILAGE:String=details.Milage;
              let newAVERAGE:String=details.Average;

              if (data.myDate !=''){
                newMYDATE=data.myDate;
              }
               if (data.mytime !=''){
                newMYTIME=data.mytime;
              }
               if (data.MRStart !=''){
                newMRSTARTE=data.MRStart;
              }

              if (data.MRend!=''){
                newMRENDE=data.MRend;
              }

              if (data.Milage !=''){
                newMILAGE=data.Milage;
              }

               if (data.Average !=''){
                newAVERAGE=data.Average;
              }

         this.details.update(details.$key,{
           myDate:newMYDATE,
           mytime:newMYTIME,
           MRStart:newMRSTARTE,
           MRend:newMRENDE,
           Milage:newMILAGE,
           Average:newAVERAGE
         })
         this.LoadDetails();
       }
     }
   ]

  });
  prompt.present();
}
deleteDetails(detailsID):void{
  let prompt = this.alertCtrl.create({
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
         this.details.remove(detailsID);
         this.LoadDetails();
       }
     }
   ]

  });
  prompt.present();
}

searchD(date)
{
  this.showLoading();
  this.details= this.angFire.database.list('/Details', {
      query: {
        orderByChild: 'myDate',
        equalTo: date
      }
    });

      this.showDetails=[];
  this.details.subscribe(items => {
        items.forEach(item => {
          if(item.user == window.localStorage.getItem('email')){
            this.showDetails.push(item);
          }
        });});
     setTimeout(() => {
        this.loader.dismiss();
      });
}

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  refreshPage()
{
  this.date=''
  this.LoadDetails();
}

}

