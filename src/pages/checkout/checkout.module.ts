import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';
import { AgmCoreModule} from 'angular2-google-maps/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CheckoutPage
  ],
  imports: [
    IonicPageModule.forChild(CheckoutPage),
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8A704eZF3d4cYOCrjEyO5P-6jvArar0s',
      libraries: ["places"]
    }),
    PipesModule
  ],
})
export class CheckoutPageModule {}
