import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'swagex-payment-succeeded',
  templateUrl: './payment-succeeded.component.html',
  styleUrls: ['./payment-succeeded.component.scss']
})
export class PaymentSucceededComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  onDone(): void {
    this.router.navigate(['classes']);
  }
}
