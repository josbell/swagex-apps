import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { AppDateAdapter, APP_DATE_FORMATS } from '../format-date-picker';
import { DanceClassStoreApi } from '../model';

@Component({
  selector: 'swagex-book-class-spots',
  templateUrl: './book-class-spots.component.html',
  styleUrls: ['./book-class-spots.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class BookClassSpotsComponent implements OnInit {
  class;
  allowChangeDatesAndNumberOfGuests: boolean = false;
  numberOfGuestsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selected = 1;

  initialDate = new FormControl(new Date());

  constructor(
    private route: ActivatedRoute,
    public danceClassStore: DanceClassStoreApi
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => this.danceClassStore.getClass(params.get('id')))
      )
      .subscribe(danceClass => {
        console.log(danceClass);
        this.class = danceClass;
      });
  }

  previousDate() {}

  nextDate() {}
}
