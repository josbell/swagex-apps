import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { LatinSwagStudioWebHomeModule } from '@swagex/latin-swag-studio-web/home';
import {
  EysDanceStudioWebModule,
  DanceClassesService,
  UserService
} from '@swagex/eys-dance-studio-web';
import { CommonUiMaterialLayoutWebModule } from '@swagex/common-ui/material-layout-web';
import { SignUpForClassModule } from '@swagex/sign-up-for-class';
import { PaymentModule } from '@swagex/payment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { DanceClassStoreApi, UserApi } from '@swagex/shared-models';
import { WindowRefService } from '@swagex/utils';

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
    SignUpForClassModule,
    PaymentModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule
  ],
  providers: [
    { provide: DanceClassStoreApi, useExisting: DanceClassesService },
    { provide: UserApi, useExisting: UserService },
    { provide: 'environment', useValue: environment },
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
