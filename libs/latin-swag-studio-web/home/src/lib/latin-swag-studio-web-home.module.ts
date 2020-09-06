import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NguCarouselModule } from '@ngu/carousel';

import { HomeComponent } from './home/home.component';
import { CommonUiMaterialModule } from '@swagex/common-ui/material';
import { CommonUiWebComponentsModule } from '@swagex/common-ui/web-components';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { InfoSectionComponent } from './info-section/info-section.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { EventsComponent } from './events/events.component';

export const latinSwagStudioWebHomeRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonUiMaterialModule,
    FlexLayoutModule,
    CommonUiWebComponentsModule,
    NguCarouselModule
  ],
  declarations: [
    HomeComponent,
    CallToActionComponent,
    InfoSectionComponent,
    ReviewsComponent,
    EventsComponent
  ],
  exports: [HomeComponent]
})
export class LatinSwagStudioWebHomeModule {}
