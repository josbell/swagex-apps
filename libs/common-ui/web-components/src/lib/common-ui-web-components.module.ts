import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonUiMaterialModule } from '@swagex/common-ui/material';

import { HeroComponent } from './hero/hero.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MaterialCardComponent } from './material-card/material-card.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, CommonUiMaterialModule],
  declarations: [HeroComponent, ReviewsComponent, MaterialCardComponent],
  exports: [HeroComponent, ReviewsComponent, MaterialCardComponent]
})
export class CommonUiWebComponentsModule {}
