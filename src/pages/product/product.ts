import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,Loading } from 'ionic-angular';

/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var MessengerExtensions:any;

@IonicPage({
  name: "product",
  segment: "pDetail/:id"
})
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  //config
  itemPlaceholder = "assets/img/pl/product-item.png";
  tab = "add-ons";
  loading:Loading;

  id:any;
  product:any;
  add_ons:any[];
  quantity:number = 1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtl: ToastController,
    public loadCtl: LoadingController
  ) {
    this.loading = this.loadCtl.create({
      content: "Đang tải..."
    })
    this.loading.present();
    this.getProduct();
  }

  loadScripts(resourse = []){
    return new Promise((resolve,reject)=>{
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.com/vi_VN/messenger.Extensions.js";
        js.addEventListener('load', function() {
          resolve("messenger loaded");
        });
        fjs.parentNode.insertBefore(js, fjs);
        resourse.forEach(src =>{
          var ext:any = d.createElement(s);
          ext.src = src;
          fjs.parentNode.insertBefore(ext,fjs);
        });
        
      }(document, 'script', 'Messenger'));
    })
  }

  closeWebView(){
    setTimeout(()=>{
      if(MessengerExtensions.isInExtension()){
        MessengerExtensions.requestCloseBrowser();
      }
    },2000);
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    console.log('ionViewDidLoad ProductPage', this.navParams.data);
    
  }

  getProduct(){
    setTimeout(()=>{
      this.product = {
        id: 1,
        title: "Some Product Title",
        description: "Long Long Long Desription",
        price: 20000,
      }
      this.loading.dismiss();
      this.getAddOns();
    },3000);
  }

  getAddOns(){
    setTimeout(()=>{
      this.add_ons = [
        {
          id: 1,
          title: "Size",
          mutil: false,
          attrs: [
            {
              id: 1,
              title: "M",
              price: 20000
            },
            {
              id: 2,
              title: "L",
              price: 30000
            }
          ]
        },
        {
          id: 2,
          title: "Topping",
          mutil: true,
          attrs: [
            {
              id: 1,
              title: "Topping A",
              price: 5000
            },
            {
              id: 2,
              title: "Topping B",
              price: 6000
            }
          ]
        },
      ]
    },3000)
  }

  addToBasket(){
    this.showNotify("Đã thêm vào giỏ hàng");
    if(!this.navCtrl.canGoBack()){
      this.loadScripts().then(()=>{
        this.closeWebView();
      });
    }
  }

  showNotify(message) {
    let toast = this.toastCtl.create({
      message: message,
      duration: 1000,
      position: "top"
    });
    toast.present();
  }

  decreaseQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  increaseQuantity(){
    if(this.quantity < 99){
      this.quantity++;
    }
  }

  clearQuantity(){
    this.quantity = 1;
  }

}
