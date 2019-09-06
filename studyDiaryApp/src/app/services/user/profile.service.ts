import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        // initialized userProfile which is linked to the firebase.
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    // since userProfile is already initialized in constructor
    // so just need to simply return this.userProfile
    return this.userProfile;
  }

  updateFirstName(first: string): Promise<any> {
    return this.userProfile
        .update({firstName: first});
  }

  updateLastName(last: string): Promise<any> {
    return this.userProfile
        .update({lastName: last});
  }

  updateDOB(birthDate: string): Promise<any> {
    return this.userProfile.update({birthDate});
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    // create a credential object
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email,
        password
    );

    return this.currentUser
    // reauthenticate user before they can do profile changes.
        .reauthenticateWithCredential(credential)
        .then(() => {
          this.currentUser.updateEmail(newEmail).then(() => {
            this.userProfile.update({email: newEmail});
          });
        })
        .catch(error => {
          console.error(error);
        });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email,
        oldPassword
    );

    return this.currentUser
        .reauthenticateWithCredential(credential)
        .then(() => {
          this.currentUser.updatePassword(newPassword).then(() => {
            console.log('Password Changed');
          });
        })
        .catch(error => {
          console.error(error);
        });
  }

















































}
