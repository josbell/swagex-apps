import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CommonUiMaterialModule } from '@swagex/common-ui/material';
import { CommonUiWebComponentsModule } from '@swagex/common-ui/web-components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NguCarouselModule } from '@ngu/carousel';

import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonUiMaterialModule,
    FlexLayoutModule,
    CommonUiWebComponentsModule,
    NguCarouselModule,
    NgxSpinnerModule
  ],
  declarations: [LandingPageComponent]
})
export class EysDanceStudioWebModule {}
