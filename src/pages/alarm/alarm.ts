import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Subscription } from 'rxjs';

/**
 * Generated class for the AlarmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html',
})
export class AlarmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private backgroundMode: BackgroundMode) {
  }
  
  worker: Subscription;
  
  ngAfterViewInit() {
  }
  
  doSnooze(){
    let callback = this.navParams.get("callback");
    callback(5000);
//    this.backgroundMode.disable();
    this.backgroundMode.enable();
    this.navCtrl.pop();
  }
  
  doStop(){
    this.backgroundMode.disable();
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }

}
