import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DanceClassStoreApi } from '@swagex/shared-models';
import { WindowRefService } from '@swagex/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class PaymentSucceededComponent implements OnInit, OnDestroy {
  confirmationDetails: ConfirmationDetails;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public danceClassStore: DanceClassStoreApi,
    private windowService: WindowRefService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
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

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
