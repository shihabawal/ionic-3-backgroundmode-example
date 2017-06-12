import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private backGroundMode:BackgroundMode) {
    
  }
  
  time = new Date().getTime();
  worker;
  
  ngAfterViewInit() {
    if (!this.backGroundMode.isEnabled()){
      this.backGroundMode.enable()
      this.backGroundMode.on('activate').subscribe(() => {
        this.worker = setInterval(function (time,bg: BackgroundMode) {
          if ((new Date().getTime() - time) > 10000){
            bg.moveToForeground();
          };
        },1000, this.time, this.backGroundMode);
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
