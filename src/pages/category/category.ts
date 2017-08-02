import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';

/**
 * Generated class for the CategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: "category",
  segment: "category"
})
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  rootPage = "List Category";
  @ViewChild(Nav) nav: Nav;
  categories:any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.getCategories();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
    
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
    },3000);
  }

  openPage(p){
    for(var i = 0; i < this.categories.length; i++) {
      if(this.categories[i].title == p.title) this.categories[i].active = true;
      else this.categories[i].active = false;
    }
    this.nav.setRoot("category-detail",{id: p.id});
  }

}
