import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../format-date-picker';

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
  numberOfGuestsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selected = 1;
  initialDate = new FormControl(new Date());
  constructor() {}

  ngOnInit(): void {}

  previousDate() {}

  nextDate() {}
}
