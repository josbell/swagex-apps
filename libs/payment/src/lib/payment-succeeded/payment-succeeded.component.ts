import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingConfirmation, DanceClassStoreApi } from '@swagex/shared-models';
import { Observable } from 'rxjs';
import { WindowRefService } from '@swagex/utils';

interface ConfirmationDetails {
  spaceNumber: string;
  danceClassTitle: string;
  danceClassTime: string;
  danceClassDate: string;
}

@Component({
  selector: 'swagex-payment-succeeded',
  templateUrl: './payment-succeeded.component.html',
  styleUrls: ['./payment-succeeded.component.scss']
})
export class PaymentSucceededComponent implements OnInit {
  confirmationDetails: ConfirmationDetails;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public danceClassStore: DanceClassStoreApi,
    private windowService: WindowRefService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'];
      if (sessionId) {
        this.confirmationDetails = JSON.parse(
          this.windowService.nativeWindow.localStorage.getItem(sessionId)
        ) as ConfirmationDetails;
      }
    });
  }

  onDone(): void {
    this.router.navigate(['classes']);
  }
}
