import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  delayNum;
  time;
  worker;

  constructor(public navCtrl: NavController, private backGroundMode:BackgroundMode) {
    
  }
  
  ngAfterViewInit() {
    
  }
  
  startBGMode() {
    if (!this.backGroundMode.isEnabled()){
      this.time = new Date().getTime();
      this.backGroundMode.enable()
      this.backGroundMode.on('activate').subscribe(() => {
        this.worker = setInterval(function (time,bg: BackgroundMode, delay) {
          console.log(new Date().getTime() - time);
          if ((new Date().getTime() - time) > delay){
            bg.wakeUp();
            bg.unlock();
            bg.moveToForeground();
            bg.disable();
          };
        },1000, this.time, this.backGroundMode, this.delayNum);
      });
      
      this.backGroundMode.on('deactivate').subscribe(() => {
        clearInterval(this.worker);
      });
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
