import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav,Events,AlertController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { AngularFire } from 'angularfire2';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewAppointmentsPage } from '../pages/view-appointments/view-appointments';
import { EditsPage } from '../pages/edits/edits';
import { RoutePage } from '../pages/route/route';

@Component({
  selector : 'myappPage',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  photourl : any;
  rootPage: any = MapPage;
  pages: Array<{title: string, component: any}>;
  user : any;
  Name = {name : window.localStorage.getItem('name'),photourl : window.localStorage.getItem('photo')}

  events : Events;
  constructor(public platform: Platform,public menu: MenuController, events : Events,public alertCtrl: AlertController,public anfire : AngularFire) {
      console.log(this.Name);
    this.events = events;
    events.subscribe('name:changed', name => {
      this.Name = name;
   });
    this.initializeApp();
    this.user = 'c';
    this.pages = [
      { title: 'Login SignUp', component: LoginPage },
      { title: 'Home', component: HelloIonicPage },
      { title: 'Discovery', component: ListPage },
      { title: 'Map Page', component: MapPage },
      { title: 'My Profile', component: TabsPage },
      { title: 'View Appointments', component: ViewAppointmentsPage },
      { title: 'Manage Stations', component: EditsPage },
      { title: 'Check Route', component: RoutePage }
    ];
  }

  initializeApp() {

    var name =localStorage.getItem('name');
    var photo = localStorage.getItem('photo');
    var currentUser = {name : name,photourl : photo}

        this.events.publish('name:changed', currentUser);
    this.platform.ready().then(() => { 
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

    });
  }

  openPage(page) {
    if(page.component==EditsPage){
      if(window.localStorage.getItem('role')=='Admin'){
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component); 
      }
      else{
        this.showConfirm();
      }
    }
    else {
      // close the menu when clicking a link from the menu
      this.menu.close();
      // navigate to the new page if it is not the current page
      this.nav.setRoot(page.component);  
    }
  }
  Logout(){
    let confirm = this.alertCtrl.create({
      title: 'Logout!',
      message: 'Are you shure you want to Logout',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
            text: 'Agree',
            handler: () => {
            window.localStorage.removeItem('uid');
            window.localStorage.setItem('name',null);
            window.localStorage.setItem('photo',null);
            window.localStorage.setItem('email',null);
            window.localStorage.setItem('role',null);
            this.Name.name = null;
            this.Name.photourl= null;
            this.anfire.auth.logout();
                let alert = this.alertCtrl.create({
                  title: 'Sucess!',
                  subTitle: 'Logout Success', 
                  buttons: ['OK']
                });
                alert.present();
          }
        }
      ]
    });
    confirm.present();
    this.nav.setRoot(LoginPage);
  }
    showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Error!!!',
      message: 'You Need To Login As Station Admin to Add A New Station',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
              this.menu.close();
              this.nav.setRoot(LoginPage);
            
          }
        }
      ]
    });
    confirm.present();
  }
}
