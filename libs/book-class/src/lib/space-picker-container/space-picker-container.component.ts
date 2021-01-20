import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { nextDay } from '@swagex/utils';
import {
  DanceClass,
  DanceClassBookingsApi,
  DanceClassStoreApi
} from '@swagex/shared-models';
import {
  StudentFormComponent,
  StudentFormPayload
} from '@swagex/common-ui/web-components';

@Component({
  selector: 'swagex-space-picker-container',
  templateUrl: './space-picker-container.component.html',
  styleUrls: ['./space-picker-container.component.scss']
})
export class SpacePickerContainerComponent implements OnInit, OnDestroy {
  danceClass: DanceClass;
  nextClassDate: string;
  selectedSpace: string;
  unsubscribe: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    public danceClassStore: DanceClassStoreApi,
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
