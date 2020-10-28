import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingConfirmation, DanceClassStoreApi } from '@swagex/shared-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'swagex-payment-succeeded',
  templateUrl: './payment-succeeded.component.html',
  styleUrls: ['./payment-succeeded.component.scss']
})
export class PaymentSucceededComponent implements OnInit {
  confirmationDetails: Observable<BookingConfirmation>;
  constructor(
    public router: Router,
    public danceClassStore: DanceClassStoreApi
  ) {}

  ngOnInit(): void {}

  onDone(): void {
    this.router.navigate(['classes']);
  }
}
