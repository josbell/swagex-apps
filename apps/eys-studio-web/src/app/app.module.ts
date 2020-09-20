import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { LatinSwagStudioWebHomeModule } from '@swagex/latin-swag-studio-web/home';
import { CommonUiMaterialLayoutWebModule } from '@swagex/common-ui/material-layout-web';
import {
  DanceClassStoreApi,
  SignUpForClassModule
} from '@swagex/sign-up-for-class';
import { PaymentModule } from '@swagex/payment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DanceClassesService } from './dance-classes.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonUiMaterialLayoutWebModule,
    LatinSwagStudioWebHomeModule,
    SignUpForClassModule,
    PaymentModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [{ provide: DanceClassStoreApi, useClass: DanceClassesService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
