import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';


import { RoomPage } from '../room/room';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data = { type: '', username: '', message: '' };
  chats = [];
  roomkey: string;
  username: string;
  offStatus: boolean = false;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {

    this.roomkey = this.navParams.get("key") as string;
    this.username = this.navParams.get("username") as string;
    this.data.type = 'message';
    this.data.username = this.username;

    let joinData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    joinData.set({
      type: 'join',
      user: this.username,
      message: this.username + ' has joined this room.',
      sendDate: Date()
    });
    this.data.message = '';

    firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });

  }

  sendMessage() {
    let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.username,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

  exitChat() {
    let exitData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    exitData.set({
      type: 'exit',
      user: this.username,
      message: this.username + ' has exited this room.',
      sendDate: Date()
    });

    this.offStatus = true;

    this.navCtrl.setRoot(RoomPage, {
      username: this.username
    });
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
