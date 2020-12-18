import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import {
  BookedClassPayload,
  DanceClass,
  DanceClassBookingsApi,
  DanceClassStoreApi
} from '@swagex/shared-models';
import { first, map, switchMap } from 'rxjs/operators';

import { AppDateAdapter, APP_DATE_FORMATS } from '../format-date-picker';
import { DanceClassService } from '../dance-class.service';
import { MatDialog } from '@angular/material/dialog';
import {
  StudentFormComponent,
  StudentFormPayload
} from '@swagex/common-ui/web-components';
import { nextDay } from '@swagex/utils';
import { StickyStyler } from '@angular/cdk/table';

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
  danceClass: DanceClass;
  nextClassDate: string;
  allowChangeDatesAndNumberOfGuests: boolean = false;
  numberOfGuestsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selected = 1;
  selectedSpace: string;

  initialDate = new FormControl(new Date());

  constructor(
    private route: ActivatedRoute,
    public danceClassStore: DanceClassStoreApi,
    public danceClassService: DanceClassService,
    public bookingService: DanceClassBookingsApi,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => this.danceClassStore.getClass(params.get('id')))
      )
      .subscribe(danceClass => {
        this.danceClass = danceClass;
        const classDate = nextDay(danceClass.weekday, danceClass.time);
        this.nextClassDate = classDate;
      });
  }

  previousDate() {}

  nextDate() {}

  onSpaceSelection(spaceNumber: string): void {
    this.selectedSpace = spaceNumber;
    this.openStudentFormDialog();
  }

  openStudentFormDialog() {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((bookingPayload: StudentFormPayload) => {
      const { hasSubscription, ...rest } = bookingPayload;
      const paymentMethod = hasSubscription ? 'Subscription' : 'Credit Card';
      const bookingInfo = {
        ...rest,
        paymentMethod,
        spaceNumber: this.selectedSpace
      };
      const { id } = this.danceClass;
      if (hasSubscription) {
        this.bookingService.bookClassWithSubscription(bookingInfo, id);
      } else {
        this.bookingService.bookClassWithCreditCardPayment(bookingInfo, id);
      }
    });
  }

  getBookingPayload({
    firstName,
    lastName,
    email,
    hasSubscription
  }: StudentFormPayload): BookedClassPayload {
    const paymentMethod = hasSubscription ? 'Subscription' : 'Credit Card';
    const studentDetails = {
      firstName,
      lastName,
      email,
      paymentMethod
    };

    return {
      ...this.danceClass,
      spaceNumber: this.selectedSpace,
      classDate: this.nextClassDate,
      studentDetails
    };
  }
}
