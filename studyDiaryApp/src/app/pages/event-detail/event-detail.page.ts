import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
// activated route if for handling navigation parameters, in this case,
// it's the event ID
import {ActivatedRoute, Router} from '@angular/router';

// camera plugin
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  public currentNote: any = {};
  public studyPicture: string = null;
  private description: string;

  constructor(
      private eventService: EventService,
      private route: ActivatedRoute,
      private router: Router,
  ) {
  }

  ngOnInit() {
      let eventId = this.route.snapshot.paramMap.get('id');
      // no idea why the return string has a '}' at the end, so I remove the last letter
      // in the string.
      eventId = eventId.substr(0, eventId.length - 1);
      this.eventService
          .getEventDetail(eventId)
          .get()
          .then(eventSnapshot => {
              this.currentNote = eventSnapshot.data();
              this.currentNote.id = eventSnapshot.id;
          });
  }

  addTextDescription(description: string): void {
      this.eventService
          .addTextDescription(this.currentNote.id, this.currentNote.text + description)
          .then(() => {
              this.router.navigateByUrl('event-list');
          });
  }

  // this method is for handling the camera to take pictures.
  async takePicture(): Promise<void> {
      try {
          const profilePicture = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              // resultType specifying the format of the image
              // using base64 is because it fits Firebase cloud storage
              resultType: CameraResultType.Base64,
          });
          this.studyPicture = profilePicture.base64String;
          this.eventService
              .addStudyPicture(this.currentNote.id, this.studyPicture)
              .then(() => {
                  this.router.navigateByUrl('event-list');
              });
      } catch (error) {
          console.error(error);
      }
  }

}
