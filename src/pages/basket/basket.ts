import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BasketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: "basket",
  segment: "basket",
  defaultHistory: ["category"]
})
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html'
})
export class BasketPage {

  //config
  itemPlaceholder = 'assets/img/pl/product-item.png';

  backets:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getBackets();
  }

  getBackets(){
    setTimeout(()=>{
      this.backets = [
        {
          id: 1,
          title: "Some Title",
          subtitle: "Some Subtitle",
          quantity: 4,
          price: 20000
        },
        {
          id: 2,
          title: "Some Title",
          subtitle: "Some Subtitle",
          quantity: 4,
          price: 20000
        }
      ]
    },3000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
  }

  checkout(){
    this.navCtrl.push('Checkout');
  }

}
