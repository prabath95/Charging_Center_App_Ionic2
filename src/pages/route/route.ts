import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

declare var google: any;

/*
  Generated class for the Route page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-route',
  templateUrl: 'route.html'
})
export class RoutePage {
  public start :any;
  public destinantion: any;
  locations2:FirebaseListObservable<any>;
  public map1:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angF:AngularFire) {
    this.locations2 = this.angF.database.list('/Locations');
  }

  calculateAndDisplayRoute() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        this.map1 = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(this.map1);
        directionsService.route({
          origin: this.start,
          destination: this.destinantion,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
        this.addMakers();
      }
      
      addMakers(){
       
      this.locations2.subscribe(locations2 =>{
      locations2.forEach(marker => {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var Mark = new google.maps.Marker({ position: position, title: marker.name,icon:"assets/img/new3.png" });
      Mark.setMap(this.map1);

      })

    })
        }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutePage');
  }

}
