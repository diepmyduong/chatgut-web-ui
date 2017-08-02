import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BasketPage } from './basket';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    BasketPage,
  ],
  imports: [
    IonicPageModule.forChild(BasketPage),
    PipesModule
  ],
})
export class BasketPageModule {}
