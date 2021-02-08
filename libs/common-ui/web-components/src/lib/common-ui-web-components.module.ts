import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonUiMaterialModule } from '@swagex/common-ui/material';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { HeroComponent } from './hero/hero.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MaterialCardComponent } from './material-card/material-card.component';
import { FooterComponent } from './footer/footer.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { InfoSectionComponent } from './info-section/info-section.component';
import { NguCarouselModule } from '@ngu/carousel';
import { DanceClassPanelsComponent } from './dance-class-panels/dance-class-panels.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CommonUiMaterialModule,
    NguCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    LazyLoadImageModule
  ],
  declarations: [
    HeroComponent,
    ReviewsComponent,
    MaterialCardComponent,
    FooterComponent,
    CallToActionComponent,
    InfoSectionComponent,
    DanceClassPanelsComponent,
    StudentFormComponent
  ],
  exports: [
    HeroComponent,
    ReviewsComponent,
    MaterialCardComponent,
    FooterComponent,
    CallToActionComponent,
    InfoSectionComponent,
    DanceClassPanelsComponent,
    StudentFormComponent
  ]
})
export class CommonUiWebComponentsModule {}
