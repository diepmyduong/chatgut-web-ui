import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryDetailPage } from './category-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CategoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryDetailPage),
    PipesModule
  ],
})
export class CategoryDetailPageModule {}
