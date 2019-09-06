import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService} from '../../services/event/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {

  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit() {
  }

  createEvent(
      studyCat: string,
      studySubject: string,
      studyTime: number,
      studyDate: number
  ): void {
    if (
        studyCat === undefined ||
        studySubject === undefined ||
        studyTime === undefined ||
        studyDate === undefined
    ) {
      return;
    }
    this.eventService
        .createEvent(studyCat, studySubject, studyTime, studyDate)
        .then(() => {
          this.router.navigateByUrl('');
        });
  }
}
