import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // collection of the events
  public eventListRef: firebase.firestore.CollectionReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase
            .firestore()
            .collection(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  // createEvent is for creating an event and put it into the event list.
  createEvent(
      studyCat: string,
      studySubject: string,
      studyTime: number,
      studyDate: number
  ): Promise<firebase.firestore.DocumentReference> {
    return this.eventListRef.add({
      category: studyCat,
      subject: studySubject,
      duration: studyTime * 1,
      date: studyDate,
      total: studyTime,
      text: null,
      pic: null,
    });
  }

  removeEvent(id) {
    return this.eventListRef.doc(id).delete();
  }
  // getEventList is for getting the current event list.
  getEventList(): firebase.firestore.CollectionReference {
    return this.eventListRef;
  }

  // getting the single event
  getEventDetail(eventId: string): firebase.firestore.DocumentReference {
    return this.eventListRef.doc(eventId);
  }

  addTextDescription(eventId: string, description: string): Promise<void> {
    return this.eventListRef
        .doc(eventId)
        .update({text: description});
  }

  addStudyPicture(eventId: string, studyPic: string = null): Promise<void> {
    if (studyPic != null) {
      const storageRef = firebase
          .storage()
          .ref(`/studyPicture/${eventId}/studyPicture.jpeg`);

      return storageRef
          .putString(studyPic, 'base64', {contentType: 'image/jpeg'})
          .then(() => {
            return storageRef.getDownloadURL().then(downloadURL => {
              return this.eventListRef
                  .doc(eventId)
                  .update({pic: downloadURL});
            });
          });
    }
  }


  // addGuest(
  //     guestName: string,
  //     eventId: string,
  //     eventPrice: number,
  //     guestPicture: string = null
  // ): Promise<void> {
  //   return this.eventListRef
  //       .doc(eventId)
  //       .collection('guestList')
  //       .add({guestName})
  //       .then((newGuest) => {
  //         // using transaction here is for making sure the update having no corruptions.
  //         // to avoid corruptions when multiple users try to update the same value at the same time.
  //         return firebase.firestore().runTransaction(transaction => {
  //           return transaction.get(this.eventListRef.doc(eventId)).then(eventDoc => {
  //             const newRevenue = eventDoc.data().revenue + eventPrice;
  //             transaction.update(this.eventListRef.doc(eventId), { revenue: newRevenue});
  //
  //             // here is the part for handling taking picture.
  //             if (guestPicture != null) {
  //               // creating a reference to the Firebase Storage.
  //               const storageRef = firebase
  //                   .storage()
  //                   .ref(`/guestProfile/${newGuest.id}/profilePicture.png`);
  //
  //               return storageRef
  //               // save the picture into the storage.
  //                   .putString(guestPicture, 'base64', { contentType: 'image/png'})
  //                   .then(() => {
  //                     return storageRef.getDownloadURL().then(downloadURL => {
  //                       return this.eventListRef
  //                           .doc(eventId)
  //                           .collection('guestList')
  //                           .doc(newGuest.id)
  //                           // update the image to the app.
  //                           .update({ profilePicture: downloadURL});
  //                     });
  //                   });
  //             }
  //           });
  //         });
  //       });
  // }
}
