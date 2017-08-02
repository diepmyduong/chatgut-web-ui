import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the VerifyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 declare var window,chatgut,AccountKit,MessengerExtensions:any;

@IonicPage({
  name: "Verify",
  segment: 'verify/:token'
})
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {

  psid:string;
  state: string;
  phone:string;
  country_code = "+84";
  appId = "143366482876596";
  appVersion = "v1.1";
  redirect = "https://chatbot-1f06d.firebaseapp.com/#/verify/%3Auid/%3Astate";


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    this.loadScripts([
      "https://sdk.accountkit.com/vi_VN/sdk.js"
    ]);
  }

  loadScripts(resourse = []){
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.com/vi_VN/messenger.Extensions.js";
      fjs.parentNode.insertBefore(js, fjs);
      resourse.forEach(src =>{
        var ext:any = d.createElement(s);
        ext.src = src;
        fjs.parentNode.insertBefore(ext,fjs);
      });
    }(document, 'script', 'Messenger'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
    var token = this.navParams.get('token');
    chatgut.api.setAccessToken(token);
    var payload = chatgut.api.getTokenInfo().then(info =>{
      this.state = info.payload.state;
    }).catch(err =>{
      console.error("ERROR",err);
      this.presentToast("ERROR : "+err);
      this.goToErrorPage();
    });
    window.extAsyncInit = this.onMessagerLoaded.bind(this);
  }

  onMessagerLoaded(){
    MessengerExtensions.getUserID(
      this.onGetUserIdSuccess.bind(this), 
      this.onGetUserIdError.bind(this)
    );
  }

  onGetUserIdSuccess(uids){
    var psid = uids.psid;
    this.presentToast("Get PSID "+JSON.stringify(psid));
    this.psid = psid;
  }

  onGetUserIdError(err,message){
    // this.presentToast("onGetUserIdError: "+message);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  closeWebView(){
    setTimeout(()=>{
      if(MessengerExtensions.isInExtension()){
        MessengerExtensions.requestCloseBrowser(
          function success() {},
          this.onGetUserIdError.bind(this)
        );
      }
    },2000);
  }

  verify(){
    AccountKit.init(
      {
        appId:this.appId, 
        state:this.state, 
        version:this.appVersion,
        fbAppEventsEnabled:true
      }
    );
    AccountKit.login('PHONE', {
      countryCode: this.country_code, 
      phoneNumber: this.phone
    },this.loginCallback.bind(this));
  }

  loginCallback(response){
    if (response.status === "PARTIALLY_AUTHENTICATED") {
      this.presentToast("PARTIALLY_AUTHENTICATED");
      chatgut.api.smsVerify({
        state: response.state,
        code: response.code
      }).then(success =>{
        this.closeWebView();
        this.navCtrl.setRoot("Success",{message: "Chúc mừng bạn!"});
      }).catch(err =>{
        this.presentToast("ERROR :"+err);
        this.goToErrorPage();
      })
    }
    else if (response.status === "NOT_AUTHENTICATED") {
      // handle authentication failure
      this.presentToast("NOT_AUTHENTICATED");
      this.closeWebView();
    }
    else if (response.status === "BAD_PARAMS") {
      // handle bad parameters
      this.presentToast("BAD_PARAMS");
      this.closeWebView();
    }
  }

  goToErrorPage(){
    // this.navCtrl.setRoot("Success",{message: "Chúc mừng bạn!"});
    this.navCtrl.setRoot("Error404");
  }

}
