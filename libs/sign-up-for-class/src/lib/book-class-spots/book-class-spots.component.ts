import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import {
  StudentFormComponent,
  StudentFormPayload
} from '@swagex/common-ui/web-components';
import {
  DanceClass,
  DanceClassBookingsApi,
  DanceClassStoreApi
} from '@swagex/shared-models';

import { nextDay } from '@swagex/utils';
import { AppDateAdapter, APP_DATE_FORMATS } from '../format-date-picker';
import { DanceClassService } from '../dance-class.service';

@Component({
  selector: 'swagex-book-class-spots',
  templateUrl: './book-class-spots.component.html',
  styleUrls: ['./book-class-spots.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class BookClassSpotsComponent implements OnInit, OnDestroy {
  danceClass: DanceClass;
  nextClassDate: string;
  selectedSpace: string;
  unsubscribe: Subject<void> = new Subject();

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
        switchMap(params => this.danceClassStore.getClass(params.get('id'))),
        takeUntil(this.unsubscribe)
      )
      .subscribe(danceClass => {
        this.danceClass = danceClass;
        const classDate = nextDay(danceClass.weekday, danceClass.time);
        this.nextClassDate = classDate;
      });
  }

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

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
