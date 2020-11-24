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
import { AdminViewBooking, DanceClassBookingsApi } from '@swagex/shared-models';
import { switchMap } from 'rxjs/operators';
import {
  StudentFormComponent,
  StudentFormPayload
} from '@swagex/common-ui/web-components';

interface BookingRow {
  spaceNumber: string;
  name: string;
  paymentMethod: string;
  email: string;
  bookedOn: string;
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
      .pipe(switchMap(params => this.bookingsApi.getBookings(params.get('id'))))
      .subscribe(bookings => {
        bookings.map(booking => booking);
        this.bookings = bookings;
        let rows: BookingRow[] = Array<BookingRow>(21)
          .fill(this.generateEmptySpace())
          .map((booking, index) => ({
            ...booking,
            spaceNumber: String(index + 1)
          }));

        const formattedBookings = bookings.forEach(booking => {
          rows[booking.spaceNumber] = {
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
    dialogRef.afterClosed().subscribe((studentDetails: StudentFormPayload) => {
      console.log(studentDetails);
    });
  }

  deleteBooking(element) {
    console.log('delete', element);
  }

  private generateEmptySpace(): BookingRow {
    return {
      spaceNumber: '',
      name: '',
      paymentMethod: '',
      email: '',
      bookedOn: ''
    };
  }
}
