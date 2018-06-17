import { SigninPage } from './../pages/signin/signin';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBQUh275urrxoilbnHuUjSIRmLIu_u9fUc",
  authDomain: "chat-firebase-7aecc.firebaseapp.com",
  databaseURL: "https://chat-firebase-7aecc.firebaseio.com",
  projectId: "chat-firebase-7aecc",
  storageBucket: "chat-firebase-7aecc.appspot.com",
  messagingSenderId: "604693654296"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }
}

