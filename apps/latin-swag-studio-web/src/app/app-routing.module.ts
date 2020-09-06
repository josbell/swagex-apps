import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'libs/latin-swag-studio-web/home/src/lib/home/home.component';
import { SignUpForClassComponent } from 'libs/sign-up-for-class/src/lib/sign-up-for-class/sign-up-for-class.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'classes', component: SignUpForClassComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
