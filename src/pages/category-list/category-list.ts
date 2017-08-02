import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController } from 'ionic-angular';

/**
 * Generated class for the CategoryListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: "List Category",
  segment: "cList"
})
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  //config
  itemPlaceholder = "assets/img/pl/product-item.png";
  categories:any[];
  loading:Loading

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtl:LoadingController
  ) {
    this.loading = this.loadCtl.create({
      content: "Đang tải..."
    })
    this.loading.present();
    this.getCategories();
  }

  getCategories(){
    setTimeout(()=>{
      this.categories = [
        { 
          id: 1,
          title: "a"
        },
        { 
          id: 2,
          title: "b"
        },
        { 
          id: 3,
          title: "c"
        }
      ];
      this.loading.dismiss();
    },3000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
  }

  showCategory(category){
    this.navCtrl.push("category-detail",{id:category.id});
  }

  checkout(){
    this.navCtrl.push('Checkout');
  }

}
