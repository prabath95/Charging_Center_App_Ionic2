import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyProfilePage } from '../my-profile/my-profile';
import { HisPage } from '../his/his';
import { DetailsPage } from '../details/details';
import { NotificationPage } from '../notification/notification';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = MyProfilePage;
  tab3Root: any = HisPage;
  tab4Root: any = DetailsPage;
  tab5Root: any = NotificationPage;

  tab1Title = "My Profile";
  tab3Title = " History";
  tab4Title = " Details";
  tab5Title = "Reminder";

  constructor(public navCtrl: NavController) {
   
   
  }
}
