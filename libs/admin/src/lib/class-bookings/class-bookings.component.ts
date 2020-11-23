import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DanceClassBookingsApi } from '@swagex/shared-models';
import { switchMap } from 'rxjs/operators';

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
  data: any;
  rowsData: BookingRow[];
  expandedElement: BookingRow | null;
  columnsToDisplay = ['spaceNumber', 'name', 'paymentMethod', 'email', 'star'];

  constructor(
    private route: ActivatedRoute,
    private bookingsApi: DanceClassBookingsApi
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap(params => this.bookingsApi.getBookings(params.get('id'))))
      .subscribe(bookings => {
        console.log(bookings);
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
            paymentMethod: 'Credit Card',
            email: booking.email
          };
        });

        this.rowsData = rows;
      });
  }

  handleMoreButtonClick(element) {
    console.log(element);
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
