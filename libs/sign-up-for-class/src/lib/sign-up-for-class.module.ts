import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonUiMaterialModule } from '@swagex/common-ui/material';
import { CommonUiWebComponentsModule } from '@swagex/common-ui/web-components';
import { PaymentModule } from '@swagex/payment';

import { ClassListComponent } from './class-list/class-list.component';
import { FiltersComponent } from './filters/filters.component';
import { FloorSpotSelectionComponent } from './floor-spot-selection/floor-spot-selection.component';
import { SignUpForClassComponent } from './sign-up-for-class/sign-up-for-class.component';
import { HomeComponent } from './home/home.component';
import { SelectClassDateTimeComponent } from './select-class-date-time/select-class-date-time.component';
import { BookClassSpotsComponent } from './book-class-spots/book-class-spots.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    ClassListComponent,
    FiltersComponent,
    FloorSpotSelectionComponent,
    SignUpForClassComponent,
    FiltersComponent,
    FloorSpotSelectionComponent,
    HomeComponent,
    SelectClassDateTimeComponent,
    BookClassSpotsComponent
  ],
  providers: [MatDatepickerModule],
  exports: [
    SignUpForClassComponent,
    ClassListComponent,
    BookClassSpotsComponent
  ]
})
export class SignUpForClassModule {}
