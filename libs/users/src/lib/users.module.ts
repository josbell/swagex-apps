import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from './google-signin.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonUiMaterialModule } from '@swagex/common-ui/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonUiMaterialModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LoginPageComponent }
    ])
  ],
  declarations: [LoginPageComponent, GoogleSigninDirective],
  exports: [GoogleSigninDirective]
})
export class UsersModule {}
