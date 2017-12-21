import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {AngularFireModule} from 'angularfire2';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import { AuthService } from '../providers/auth-service';
import {ConnectivityService} from '../providers/connectivity-service';
import { TabsPage } from '../pages/tabs/tabs';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { NotificationPage } from '../pages/notification/notification';
import { RecordPage } from '../pages/record/record';
import { HisPage } from '../pages/his/his';
import { DetailsPage } from '../pages/details/details';
import { TimerComponent } from '../components/timer/timer';
import { AppointmentsPage } from '../pages/add-appointments/add-appointments';
import { ViewAppointmentsPage } from '../pages/view-appointments/view-appointments';
import { EditappoPage } from '../pages/edit-appo/edit-appo';
import { CheckinPage } from '../pages/check-in/check-in';
import { ratingsPage } from '../pages/ratings/ratings';
import { InfoPage } from '../pages/info/info';
import { EditdeletePage } from '../pages/editdelete/editdelete';
import { EditsPage } from '../pages/edits/edits';
import { StationPage } from '../pages/station/station';
import { RoutePage } from '../pages/route/route';

 const angConfig = {
    apiKey: "AIzaSyAfOs2AF6WpyxmaakMJDbtXKZYy80wfvL0",
    authDomain: "my-app-93a5a.firebaseapp.com",
    databaseURL: "https://my-app-93a5a.firebaseio.com",
    projectId: "my-app-93a5a",
    storageBucket: "my-app-93a5a.appspot.com",
    messagingSenderId: "287620851093"
  };

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    EditdeletePage,
    EditsPage,
    StationPage,
    RoutePage,
    ratingsPage,
    ItemDetailsPage,
    ListPage,
    AppointmentsPage,
    ViewAppointmentsPage,
    InfoPage,
    EditappoPage,
    MapPage,
    LoginPage,
    SignupPage,
    TabsPage,
    MyProfilePage,
    NotificationPage,
    RecordPage,
    HisPage,
    CheckinPage,
    DetailsPage,
    TimerComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      mode: 'ios'
    }),
    AngularFireModule.initializeApp(angConfig)
  ],
  bootstrap: [IonicApp],
  
  entryComponents: [
    MyApp,
    EditdeletePage,
    EditsPage,
    StationPage,
    RoutePage,
    HelloIonicPage,
    ItemDetailsPage,
    ratingsPage,
    ListPage,
    MapPage,
    LoginPage,
    SignupPage,
    InfoPage,
    TabsPage,
    MyProfilePage,
    NotificationPage,
    RecordPage,
    CheckinPage,
    HisPage,
    AppointmentsPage,
    ViewAppointmentsPage,
    EditappoPage,
    DetailsPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},AuthService,ConnectivityService]
})
export class AppModule {}
