import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LatinSwagStudioWebHomeModule } from '@swagex/latin-swag-studio-web/home';
import { CommonUiMaterialLayoutWebModule } from '@swagex/common-ui/material-layout-web';
import { SignUpForClassModule } from '@swagex/sign-up-for-class';
import { PaymentModule } from '@swagex/payment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonUiMaterialLayoutWebModule,
    LatinSwagStudioWebHomeModule,
    SignUpForClassModule,
    PaymentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
