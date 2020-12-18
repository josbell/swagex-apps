import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  AdminViewBooking,
  DanceClassBookingsApi,
  BookingData
} from '@swagex/shared-models';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import {
  StudentFormComponent,
  StudentFormPayload
} from '@swagex/common-ui/web-components';

interface BookingRow {
  spaceNumber: string;
  name: string;
  paymentMethod: string;
  email: string;
}

@Component({
  selector: 'swagex-class-bookings',
  templateUrl: './class-bookings.component.html',
  styleUrls: ['./class-bookings.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ClassBookingsComponent implements OnInit {
  classId: string;
  bookings: AdminViewBooking[];
  rowsData: BookingRow[];
  expandedElement: BookingRow | null;
  columnsToDisplay = ['spaceNumber', 'name', 'paymentMethod', 'email', 'star'];

  constructor(
    private route: ActivatedRoute,
    private bookingsApi: DanceClassBookingsApi,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(params => (this.classId = params.get('id'))),
        switchMap(params => this.bookingsApi.getBookings(params.get('id')))
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
            return this.bookingsApi.replaceBooking(booking, newBooking);
          } else {
            return this.bookingsApi.addBookingToDB(
              {
                ...bookingData,
                spaceNumber
              },
              this.classId
            );
          }
        })
      )
      .subscribe();
  }

  deleteBooking({ spaceNumber }) {
    const booking = this.bookings.find(
      booking => booking.spaceNumber === spaceNumber
    );
    this.bookingsApi.cancelBooking(booking).subscribe();
  }

  private generateEmptySpace(): BookingRow {
    return {
      spaceNumber: '',
      name: '',
      paymentMethod: '',
      email: ''
    };
  }
}
