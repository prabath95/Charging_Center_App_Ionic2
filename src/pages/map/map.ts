import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Platform, ModalController ,LoadingController} from 'ionic-angular';
import { GoogleMap, GoogleMapsLatLng } from 'ionic-native';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import { AlertController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { ActionSheetController } from 'ionic-angular';
import { InfoPage } from '../info/info';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') map;
  markerCluster: any;
  mapv: any;
  address:any;
  autocompleteItems;
  autocomplete;
  locations : FirebaseListObservable <any>; 
  mapoptions:any;
  loader: any;  
  connection :any;
  currentLocation : any;

  constructor(public actionSheetCtrl: ActionSheetController, public connectivityService: ConnectivityService,public alertCtrl: AlertController,private loadingCtrl: LoadingController,public navCtrl: NavController, public platform: Platform, public modalCtrl: ModalController, private zone: NgZone,public angfire : AngularFire) {
    this.locations = this.angfire.database.list('/Locations');
    this.address = {
      place: ''
    };
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    
  }
  ionViewDidLoad(){

  this.addConnectivityListeners();
  if(typeof google == "undefined" || typeof google.maps == "undefined"){
      this.showDismissAlert('Error','Need Internet Connection To Continue.');
  }
    else {
  
      if(this.connectivityService.isOnline()){
        this.LoadMap();
      }
      else {
        this.showDismissAlert('Error','Need Internet Connection To Continue.');
      }
    }
  }
  initJSMaps(mapEle) {
    this.showLoading();
    let scope = this;
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
        new google.maps.Map(mapEle, {
          center: { lat:position.coords.latitude, lng:position.coords.longitude },
          zoom: 11
        });
        scope.currentLocation = {latitude:position.coords.latitude , longitude:position.coords.longitude};
        setTimeout(() => {
        scope.loader.dismiss();
      });
      scope.connection = 'true';
      },function(){
        scope.showAlert('Fail!','The Geolocation service failed.');
      });
    }else{
      this.showAlert('Fail!','The Geolocation service failed.');
    }
  }

  initNativeMaps(mapEle) {
    this.map = new GoogleMap(mapEle);
    mapEle.classList.add('show-map');

    GoogleMap.isAvailable().then(() => {
      const position = new GoogleMapsLatLng(6.927079, 79.861244);
      this.map.setPosition(position);
    });
  }

  LoadMap() {
    let mapEle = this.map.nativeElement;

    if (!mapEle) {
      console.error('Unable to initialize map, no map element with #map view reference.');
      return;
    }
    if (this.platform.is('cordova') === true) {
      this.initNativeMaps(mapEle);
    } else {
      this.initJSMaps(mapEle);
    }
  }
  addMarkersToMap() {
    this.showLoading();
    //this.locations = this.angfire.database.list('/Locations');
    let mapc = this.map.nativeElement;
          let mapoptions3 = new google.maps.Map(mapc, {
          center: { lat: 6.933239, lng: 79.877283 },
          zoom: 12,
        }); 
    let scope = this;
    this.locations.subscribe(locations => {
        locations.forEach(marker => {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      if (marker.type=="Residence"){
      var Mark = new google.maps.Marker({ position: position, title: marker.name,icon:"assets/img/new.png" });
    }
    else{
      var Mark = new google.maps.Marker({ position: position, title: marker.name,icon:"assets/img/new3.png" });
    }
      Mark.setMap(mapoptions3);

      google.maps.event.addListener(Mark, 'click', () => {
        window.localStorage.setItem('markerName',marker.name);
        this.presentActionSheet(marker,marker.latitude,marker.longitude);
      });});
          setTimeout(() => {
          scope.loader.dismiss();
        });  
      });
  }


  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    new google.maps.places.AutocompleteService().getPlacePredictions({ input: this.autocomplete.query }, function (predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function () {
        if (predictions != undefined || predictions != null) {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction);
          });
        }
      });
    });
  }
  chooseItem(item: any) {
    this.showLoading();
    this.autocomplete.query = item.description;
    let mapc = this.map.nativeElement;
    let mapoptions2 = new google.maps.Map(mapc, {
      center: { lat: 6.933239, lng: 79.877283 },
      zoom: 11
    });
    this.geocodePlaceId(new google.maps.Geocoder, mapoptions2, new google.maps.InfoWindow, item.place_id);
    this.autocompleteItems = [];
    setTimeout(() => {
        this.loader.dismiss();
    });
  }



  geocodePlaceId(geocoder, map, infowindow, placeId) {
    geocoder.geocode({ 'placeId': placeId }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(11);
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  getCurrentLocation(){
    this.showLoading();
       let mapc = this.map.nativeElement;
    let mapoptions3 = new google.maps.Map(mapc, {
      center: { lat: 6.933239, lng: 79.877283 },
      zoom: 15
    });
    var infowindo = new google.maps.InfoWindow;
          var posi = {
            lat: this.currentLocation.latitude,
            lng: this.currentLocation.longitude
          }
            infowindo.setPosition(posi);
            var html = "<h5><b>Your Current Location</h5>";
            infowindo.setContent(html);
            infowindo.open(mapoptions3);
            mapoptions3.setCenter(posi);
            setTimeout(() => {
            this.loader.dismiss();
        });  
  }
  drowCircle(map,Cordinates){
    new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: Cordinates,
            radius: 5000,
          });
  }
    calcRoute(latitude , longitude) {
      this.showLoading();
      let scope = this;
      let mape = this.map.nativeElement;
          let mapoptions5 = new google.maps.Map(mape, {
          center: { lat: 6.933239, lng: 79.877283 },
          zoom: 11
      });
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer()
        var start ;
        var request;
        var end = new google.maps.LatLng(latitude,longitude); 
          var posi = {
            lat: this.currentLocation.latitude,
            lng: this.currentLocation.longitude
          }
          start = new google.maps.LatLng(posi.lat, posi.lng);
          request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(mapoptions5);
                setTimeout(() => {
                scope.loader.dismiss();
                });
                
            } else {
                alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);    
            }
        });
  }
  showAlert(title,message) {
    setTimeout(() => {
        this.loader.dismiss();
      });
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
    showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }




  addConnectivityListeners(){
 
    let onOnline = () => {

      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
         this.ionViewDidLoad();
        } else {
          this.ionViewDidLoad();
        }
      }, 2000);     
    };
 
    let onOffline = () => {
        this.showDismissAlert('Error','Need Internet Connection To Continue.');
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }

    showDismissAlert(title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  find_closest_marker() {    
            var lat1 = this.currentLocation.latitude;
            var lon1 = this.currentLocation.longitude;
            var pi = Math.PI;
            var R = 6371; //equatorial radius
            var distances = [];
            var closest = -1;
            var closestMarker :any;
            var i = 0;
            this.locations.subscribe(locations => {
                locations.forEach(markers => {
                  var lat2 = markers.latitude;
                  var lon2 =  markers.longitude;

                  var chLat = lat2-lat1;
                  var chLon = lon2-lon1;

                  var dLat = chLat*(pi/180);
                  var dLon = chLon*(pi/180);

                  var rLat1 = lat1*(pi/180);
                  var rLat2 = lat2*(pi/180);

                  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2); 
                  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                  var d = R * c;

                  distances[i] = d;
                  if ( closest == -1 || d < distances[closest] ) {
                      closest = i;
                      closestMarker = markers;
                  }
                  i = i+1;
                  if(locations.length==i){
                    this.calcRoute(closestMarker.latitude,closestMarker.longitude);
                  }
            });});
      }
  presentActionSheet(stat,latitude,longitude) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Show Path',
          handler: () => {
            this.calcRoute(latitude,longitude);
          }
        },{
          text: 'Details',
          handler: () => {
            this.navCtrl.push(InfoPage,{
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
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}

