import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpForClassComponent } from 'libs/sign-up-for-class/src/lib/sign-up-for-class/sign-up-for-class.component';
import { PaymentSucceededComponent } from 'libs/payment/src/lib/payment-succeeded/payment-succeeded.component';
import { BookClassSpotsComponent } from '@swagex/sign-up-for-class';
import { LandingPageComponent } from 'libs/eys-dance-studio-web/src/lib/landing-page/landing-page.component';
import { AuthGuard } from '@swagex/users';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  {
    path: 'signin',
    loadChildren: () => import('@swagex/users').then(m => m.UsersModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('@swagex/admin').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  { path: 'classes', component: SignUpForClassComponent },
  { path: 'classes/:id/book', component: BookClassSpotsComponent },
  { path: 'payment-failed', redirectTo: 'classes', pathMatch: 'full' },
  { path: 'payment-succeeded', component: PaymentSucceededComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
