import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryListPage } from './category-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CategoryListPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryListPage),
    PipesModule
  ],
})
export class CategoryListPageModule {}
