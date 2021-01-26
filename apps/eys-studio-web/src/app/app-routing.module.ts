import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PaymentSucceededComponent } from 'libs/payment/src/lib/payment-succeeded/payment-succeeded.component';
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
  {
    path: 'classes',
    loadChildren: () =>
      import('@swagex/book-class').then(m => m.BookClassModule)
  },
  { path: 'payment-failed', redirectTo: 'classes', pathMatch: 'full' },
  { path: 'payment-succeeded', component: PaymentSucceededComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
