import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonUiMaterialModule } from '@swagex/common-ui/material';
import { CommonUiWebComponentsModule } from '@swagex/common-ui/web-components';
import { PaymentModule } from '@swagex/payment';

import { FloorSpotSelectionComponent } from './floor-spot-selection/floor-spot-selection.component';
import { SignUpForClassComponent } from './sign-up-for-class/sign-up-for-class.component';
import { BookClassSpotsComponent } from './book-class-spots/book-class-spots.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonUiMaterialModule,
    FlexLayoutModule,
    CommonUiWebComponentsModule,
    PaymentModule
  ],
  declarations: [
    FloorSpotSelectionComponent,
    SignUpForClassComponent,
    FloorSpotSelectionComponent,
    BookClassSpotsComponent
  ],
  providers: [MatDatepickerModule],
  exports: [SignUpForClassComponent, BookClassSpotsComponent]
})
export class SignUpForClassModule {}
