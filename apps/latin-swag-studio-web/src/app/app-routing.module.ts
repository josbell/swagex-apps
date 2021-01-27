import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@swagex/latin-swag-studio-web/home';
import {
  PaymentSucceededComponent,
  PaymentFailedComponent
} from '@swagex/payment';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'payment-failed', component: PaymentFailedComponent },
  { path: 'payment-succeeded', component: PaymentSucceededComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
