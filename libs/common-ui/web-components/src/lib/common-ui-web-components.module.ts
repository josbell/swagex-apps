import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonUiMaterialModule } from '@swagex/common-ui/material';

import { HeroComponent } from './hero/hero.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MaterialCardComponent } from './material-card/material-card.component';
import { FooterComponent } from './footer/footer.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { InfoSectionComponent } from './info-section/info-section.component';
import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CommonUiMaterialModule,
    NguCarouselModule
  ],
  declarations: [
    HeroComponent,
    ReviewsComponent,
    MaterialCardComponent,
    FooterComponent,
    CallToActionComponent,
    InfoSectionComponent
  ],
  exports: [
    HeroComponent,
    ReviewsComponent,
    MaterialCardComponent,
    FooterComponent,
    CallToActionComponent,
    InfoSectionComponent
  ]
})
export class CommonUiWebComponentsModule {}
