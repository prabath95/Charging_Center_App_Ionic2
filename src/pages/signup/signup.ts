import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {LoginPage} from '../login/login'


/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  fName: string;
  lName: string;
  loader: any;  
  user = {email:'' , password: ''};
  Confirm : any;
  Role: any;

  constructor(public navCtrl: NavController,public angfire: AngularFire, private loadingCtrl: LoadingController,private alertCtrl: AlertController) {
  }

  registerUser() {
    this.showLoading();
    if(this.fName == ''||this.fName == undefined ){
      this.showError('First Name Cannot Be Empty');
    }
    else if(this.lName == ''||this.lName == undefined){
      this.showError('Last Name Cannot Be Empty');
    }
    else if(this.user.email==''||this.user.email==undefined){
      this.showError('Email Cannot Be Empty');
    }
    else if(this.user.password==''||this.user.password==undefined){
      this.showError('Password Cannot Be Empty');
    } 
    else if(this.user.password!=this.Confirm){
      this.showError('Password Does Not Match');
    }
    else if(!this.StringValidation(this.fName)){
      this.showError('Invalid First Name');
    }
    else if(!this.StringValidation(this.lName)){
      this.showError('Invalid Last Name');
    }
    else{
      this.angfire.database.list('/users').push({
        Email : this.user.email,
        firstName : this.fName,
        Lastname : this.lName,
        Password : this.user.password,
        Role : this.Role
      }).catch((error) => {
        console.log(error);
      });
      this.angfire.auth.createUser(this.user).then((authData) => {
        setTimeout(() => {
          this.loader.dismiss();
        });
        let prompt = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'New Account created!',
          buttons: ['OK']
        });
        prompt.present();
        this.navCtrl.push(LoginPage);
      }).catch((error) => {
        this.showError(error.message);
      });
      
    }
  }

    showLoading() {
      this.loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loader.present();
    }
    showError(text) {
    setTimeout(() => {
      this.loader.dismiss();
    });
 
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }

StringValidation(x) 
{    
   return /^[A-z ]+$/.test(x);
}

}
