import { Component } from '@angular/core';
import { NavController,LoadingController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {MyApp} from '../../app/app.component';
import { AlertController } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string;
  password: string;
  fName: string;
  round: boolean;
  expand: boolean;
  loader: any; 
  Role:any;


  constructor(public navCtrl: NavController,private auth : AuthService,private loadingCtrl: LoadingController,public anfire : AngularFire,public alertCtrl: AlertController) {
    
  }
  showAlert(message) {
    setTimeout(() => {
        this.loader.dismiss();
      });
    let alert = this.alertCtrl.create({
      title: 'Login Error!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
    showSuccessAlert(message) {
    setTimeout(() => {
    this.loader.dismiss();
      });
    let alert = this.alertCtrl.create({
      title: 'Sucess!',
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
    SignUp(){
        this.navCtrl.push(SignupPage);
    }
     login(){
       this.showLoading();
       if(this.Role == undefined || this.Role == ''){
         this.showAlert('Please Select User Type');
       }
       else if(this.email == undefined || this.email==''){
          this.showAlert("Email cannot be empty");
       }
       else if(this.password =='' || this.password == undefined){
          this.showAlert("Password cannot be empty");
       }
       else{
      this.anfire.auth.login({
        email: this.email,
        password: this.password 
      },
      {
        provider:AuthProviders.Password,
        method: AuthMethods.Password 
      }).then((response)=>{
       var user = this.anfire.database.list('/users');
       user.subscribe(user => {
        user.forEach(userDetails => {
          if(this.Role == 'Admin'){
            if(userDetails.Role=='Admin' && userDetails.Email == this.email){
              this.fName = userDetails.firstName+" "+userDetails.Lastname;
              window.localStorage.setItem('name',this.fName);
              window.localStorage.setItem('uid',response.auth.uid);
              window.localStorage.setItem('photo',response.auth.photoURL);
              window.localStorage.setItem('email',this.email);
              window.localStorage.setItem('role',this.Role);
              this.showSuccessAlert('Login successful');
              this.navCtrl.push(MyApp);
            }
              else if (userDetails.Role=='User' && userDetails.Email == this.email){
              this.showAlert('Invalid User Type');
            }
          }
          
          if(this.Role == 'User'){
            if(userDetails.Role=='User' && userDetails.Email == this.email){
              this.fName = userDetails.firstName+" "+userDetails.Lastname;
              window.localStorage.setItem('name',this.fName);
              window.localStorage.setItem('uid',response.auth.uid);
              window.localStorage.setItem('photo',response.auth.photoURL);
              window.localStorage.setItem('email',this.email);
              window.localStorage.setItem('role',this.Role);
              this.showSuccessAlert('Login successful');
              this.navCtrl.push(MyApp);
            }
              else if(userDetails.Role=='Admin' && userDetails.Email == this.email) {
              this.showAlert('Invalid User Type');
            }
          }
        });});
      }).catch((error) => {
        this.showAlert(error.message);
      })
       }
    }
    FBLogin(){
      this.showLoading();
      this.anfire.auth.login({
        provider: AuthProviders.Facebook,
        method:AuthMethods.Popup
      }).then((Response)=>{
        var message = 'Login successful';
        this.showSuccessAlert(message);
        window.localStorage.setItem('uid',Response.auth.uid);
        window.localStorage.setItem('name',Response.auth.displayName);
        window.localStorage.setItem('photo',Response.auth.photoURL);
        window.localStorage.setItem('email',Response.auth.email);
        this.navCtrl.push(MyApp);
      }).catch((error) => {
       this.showAlert(error.message);
      })
    }
    googleLogin(){
      this.showLoading();
      this.anfire.auth.login({
        provider: AuthProviders.Google,
        method:AuthMethods.Popup
      }).then((Response)=>{
        console.log(Response);
        var message = 'Login successful';
        this.showSuccessAlert(message);
        window.localStorage.setItem('email',Response.auth.email);
        window.localStorage.setItem('uid',Response.auth.uid);
        window.localStorage.setItem('name',Response.auth.displayName);
        window.localStorage.setItem('photo',Response.auth.photoURL);
        this.navCtrl.push(MyApp);
      }).catch((error) => {
       this.showAlert(error.message);
      })
    }
      setClass() {
    let classes = {
      round: this.round,
      expand: this.expand
    };
    return classes;
  }
    showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Reset your password!',
      message: "Please enter your email address and we'll send you an email to reset your password.",
      inputs: [
        {
          name: 'Email',
          placeholder: 'Example@example.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.showLoading();
            this.auth.resetPassword(data.Email).then(()=>{
              var message = "Password Reset Link Sent To Your Email";
              this.showSuccessAlert(message);
            },error=>{
              this.showAlert(error.message);
            });
          }
        }
      ] 
    });
    prompt.present();
  }
}


