import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@swagex/latin-swag-studio-web/home';
import { SignUpForClassComponent } from 'libs/sign-up-for-class/src/lib/sign-up-for-class/sign-up-for-class.component';
import {
  PaymentSucceededComponent,
  PaymentFailedComponent,
  PaymentComponent
} from '@swagex/payment';
import { BookClassSpotsComponent } from '@swagex/sign-up-for-class';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'classes', component: SignUpForClassComponent },
  { path: 'classes/:classId/book', component: BookClassSpotsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment-failed', component: PaymentFailedComponent },
  { path: 'payment-succeeded', component: PaymentSucceededComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
