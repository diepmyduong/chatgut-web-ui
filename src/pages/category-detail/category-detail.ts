import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,Loading,LoadingController } from 'ionic-angular';

/**
 * Generated class for the CategoryDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: "category-detail",
  segment: "cDetail/:id"
})
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {

  //config
  itemPlaceholder = 'assets/img/pl/product-item.png';
  loading:Loading;
  //public
  id;
  products: any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public loadCtl: LoadingController
  ) {
    this.loading = this.loadCtl.create({
      content: "Đang tải..."
    })
    this.loading.present();
    this.getProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryDetailPage');
    this.id = this.navParams.get("id");
  }

  getProducts(){
    setTimeout(()=>{
      this.products = [
        {
          id: 1,
          title: 'Title',
          subtitle: 'Sub title',
          price: 20000
        },
        {
          id: 2,
          title: 'Title',
          subtitle: 'Sub title',
          price: 20000
        },
        {
          id: 3,
          title: 'Title',
          subtitle: 'Sub title',
          price: 20000
        },
        {
          id: 4,
          title: 'Title',
          subtitle: 'Sub title',
          price: 20000
        }
      ];
      this.loading.dismiss();
    },2000);
  }

  openBasket(){
    this.navCtrl.push("basket");
  }

  showProduct(product){
    this.navCtrl.push('product',{id: product.id});
  }

  checkout(){
    this.navCtrl.push('Checkout');
  }

}
