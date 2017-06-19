import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlarmPage } from './alarm';

@NgModule({
  declarations: [
    AlarmPage,
  ],
  imports: [
    IonicPageModule.forChild(AlarmPage),
  ],
  exports: [
    AlarmPage
  ]
})
export class AlarmPageModule {}
