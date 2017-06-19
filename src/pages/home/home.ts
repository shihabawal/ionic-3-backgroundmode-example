import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NavController } from 'ionic-angular';
import { AlarmPage } from '../alarm/alarm';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  delayNum;
  time;
  worker: Subscription;

  constructor(public navCtrl: NavController, private backGroundMode:BackgroundMode) {
    
  }
  
  ngAfterViewInit() {
    this.worker = this.backGroundMode.on('enable').subscribe(() => this.alarmFunction());

      this.backGroundMode.on('deactivate').subscribe(() => {
        this.backGroundMode.disable();
      });
  }
  
  
  alarmFunction(){
        setTimeout(function(delayNum, bg: BackgroundMode, navCtrl: NavController, callbackFunction) {
          bg.wakeUp();
          bg.unlock();
          bg.moveToForeground();
          navCtrl.push(AlarmPage,{
            callback: callbackFunction
          });
          bg.disable();
        },this.delayNum, this.delayNum, this.backGroundMode, this.navCtrl, this.callbackFunction);
  }
  
  callbackFunction = (delayNum) => {
    this.delayNum = delayNum;
    console.log('Called!!!!!!!!!!!!!!!');
  }
  
  startBGMode() {
    if (!this.backGroundMode.isEnabled()){
      this.time = new Date().getTime();
      this.backGroundMode.enable()
    }
  }
  
  stopBGMode() {
    this.backGroundMode.disable();
  }
  
  checkBGMode() {
    document.getElementById('isActive').innerHTML = this.backGroundMode.isActive() ? "Active" : "Inactive" ;
    document.getElementById('isEnabled').innerHTML = this.backGroundMode.isEnabled() ? "Enabled" : "Disabled" ;
  }
}
