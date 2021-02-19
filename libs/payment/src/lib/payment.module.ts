import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiMaterialModule } from '@swagex/common-ui/material';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { PaymentSucceededComponent } from './payment-succeeded/payment-succeeded.component';
import { WindowRefService } from '@swagex/utils';

@NgModule({
  imports: [
    CommonModule,
    NgxStripeModule.forRoot(
      'pk_live_51HIOJICcgFukbIK9AVTWGqYexU5qY5EQfDomBZ2eGw9Y4Cbd7tPGdjZfWcTuJZ7McydPkMo7E1vX4T3XI1pKTsYw00ovI0np3z'
    ),
    FormsModule,
    ReactiveFormsModule,
    CommonUiMaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  declarations: [PaymentFailedComponent, PaymentSucceededComponent],
  providers: [WindowRefService],
  exports: [PaymentFailedComponent, PaymentSucceededComponent]
})
export class PaymentModule {}
