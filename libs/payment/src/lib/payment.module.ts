import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiMaterialModule } from '@swagex/common-ui/material';
import { CreateTokenComponent } from './create-token/create-token.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { PaymentSucceededComponent } from './payment-succeeded/payment-succeeded.component';

@NgModule({
  imports: [
    CommonModule,
    NgxStripeModule.forRoot(
      'pk_test_51HIOJICcgFukbIK99fietHHQS3EfF7UFcon9wBN8njSiz45HUn7eciz0msHeyF3QMPcJQVnmFz1U0pbYsVPZqfaV00e3S2WLC9'
    ),
    FormsModule,
    ReactiveFormsModule,
    CommonUiMaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  declarations: [
    CreateTokenComponent,
    PaymentComponent,
    PaymentFailedComponent,
    PaymentSucceededComponent
  ],
  exports: [PaymentComponent, PaymentFailedComponent, PaymentSucceededComponent]
})
export class PaymentModule {}
