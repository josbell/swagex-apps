import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Booking, BookingData, BookingStoreApi } from '@swagex/shared-models';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  StudentFormComponent,
  StudentFormPayload
} from '@swagex/common-ui/web-components';
import { Subject } from 'rxjs';

interface BookingRow {
  spaceNumber: string;
  name: string;
  paymentMethod: string;
  email: string;
}

@Component({
  selector: 'swagex-class-bookings',
  templateUrl: './class-bookings.component.html',
  styleUrls: ['./class-bookings.component.scss']
})
export class ClassBookingsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  classId: string;
  bookings: Booking[];
  rowsData: BookingRow[];
  expandedElement: BookingRow | null;
  columnsToDisplay = ['spaceNumber', 'name', 'paymentMethod', 'email', 'star'];

  constructor(
    private route: ActivatedRoute,
    private bookingStore: BookingStoreApi,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(params => (this.classId = params.get('id'))),
        switchMap(params => this.bookingStore.getBookings(params.get('id'))),
        takeUntil(this.unsubscribe)
      )
      .subscribe(bookings => {
        this.bookings = bookings;
        let rows: BookingRow[] = Array<BookingRow>(21)
          .fill(this.generateEmptySpace())
          .map((emptyBooking, index) => ({
            ...emptyBooking,
            spaceNumber: String(index + 1)
          }));
        const formattedBookings = bookings.forEach(booking => {
          const index: number = Number(booking.spaceNumber) - 1;
          rows[index] = {
            spaceNumber: booking.spaceNumber,
            name: `${booking.firstName} ${booking.lastName}`,
            paymentMethod: booking.paymentMethod,
            email: booking.email
          };
        });
        this.rowsData = rows;
      });
  }

  editBooking({ spaceNumber }) {
    let data: StudentFormPayload = {
      firstName: '',
      lastName: '',
      email: '',
      hasSubscription: false
    };

    const booking = this.bookings.find(
      booking => booking.spaceNumber === spaceNumber
    );

    if (booking) {
      // Extract form fields from booking
      data = (({ firstName, lastName, email, paymentMethod }) => ({
        firstName,
        lastName,
        email,
        hasSubscription: paymentMethod === 'Subscription'
      }))(booking);
    }

    const dialogRef = this.dialog.open(StudentFormComponent, {
      data,
      width: '600px'
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(val => !!val),
        map((studentDetails: StudentFormPayload) => {
          const { hasSubscription, ...rest } = studentDetails;
          const paymentMethod = hasSubscription
            ? 'Subscription'
            : 'Credit Card';
          return { ...rest, paymentMethod };
        }),
        switchMap((bookingData: BookingData) => {
          if (booking) {
            const newBooking = {
              ...booking,
              ...bookingData,
              stripeCustomerId: '',
              stripeSessionId: ''
            };
            return this.bookingStore.replaceBooking(booking, newBooking);
          } else {
            return this.bookingStore.add({
              ...bookingData,
              spaceNumber,
              danceClassId: this.classId
            });
          }
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe();
  }

  deleteBooking({ spaceNumber }) {
    const booking = this.bookings.find(
      booking => booking.spaceNumber === spaceNumber
    );
    this.bookingStore
      .cancelBooking(booking)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();
  }

  private generateEmptySpace(): BookingRow {
    return {
      spaceNumber: '',
      name: '',
      paymentMethod: '',
      email: ''
    };
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
