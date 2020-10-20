import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'libs/latin-swag-studio-web/home/src/lib/home/home.component';
import { SignUpForClassComponent } from 'libs/sign-up-for-class/src/lib/sign-up-for-class/sign-up-for-class.component';
import { PaymentComponent } from 'libs/payment/src/lib/payment/payment.component';
import { PaymentSucceededComponent } from 'libs/payment/src/lib/payment-succeeded/payment-succeeded.component';
import { BookClassSpotsComponent } from '@swagex/sign-up-for-class';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'classes', component: SignUpForClassComponent },
  { path: 'classes/:id/book', component: BookClassSpotsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment-failed', redirectTo: 'classes', pathMatch: 'full' },
  { path: 'payment-succeeded', component: PaymentSucceededComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
