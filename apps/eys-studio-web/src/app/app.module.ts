import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { LatinSwagStudioWebHomeModule } from '@swagex/latin-swag-studio-web/home';
import {
  EysDanceStudioWebModule,
  DanceClassesService,
  UserService,
  ClassBookingsService,
  ApiService
} from '@swagex/eys-dance-studio-web';
import { CommonUiMaterialLayoutWebModule } from '@swagex/common-ui/material-layout-web';
import { PaymentModule } from '@swagex/payment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import {
  DanceClassStoreApi,
  UserApi,
  BookingServiceApi,
  HttpsApi,
  BookingStoreApi
} from '@swagex/shared-models';
import { WindowRefService } from '@swagex/utils';
import { AdminModule } from '@swagex/admin';
import { BookingStoreService } from 'libs/eys-dance-studio-web/src/lib/stores/booking-store.service';

export function windowFactory(): Window {
  return window;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonUiMaterialLayoutWebModule,
    EysDanceStudioWebModule,
    LatinSwagStudioWebHomeModule,
    PaymentModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AdminModule
  ],
  providers: [
    { provide: DanceClassStoreApi, useExisting: DanceClassesService },
    { provide: BookingStoreApi, useExisting: BookingStoreService },
    { provide: BookingServiceApi, useExisting: ClassBookingsService },
    { provide: UserApi, useExisting: UserService },
    { provide: 'environment', useValue: environment },
    { provide: HttpsApi, useExisting: ApiService },
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
