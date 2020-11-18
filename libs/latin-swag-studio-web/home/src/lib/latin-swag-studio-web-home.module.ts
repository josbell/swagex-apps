import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './home/home.component';
import { CommonUiMaterialModule } from '@swagex/common-ui/material';
import { CommonUiWebComponentsModule } from '@swagex/common-ui/web-components';
import { EventsComponent } from './events/events.component';

export const latinSwagStudioWebHomeRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonUiMaterialModule,
    FlexLayoutModule,
    CommonUiWebComponentsModule
  ],
  declarations: [HomeComponent, EventsComponent],
  exports: [HomeComponent]
})
export class LatinSwagStudioWebHomeModule {}
