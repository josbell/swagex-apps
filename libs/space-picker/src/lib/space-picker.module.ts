import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HeaderComponent } from './header/header.component';
import { PickerComponent } from './picker/picker.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule
  ],
  declarations: [HeaderComponent, PickerComponent],
  exports: [HeaderComponent, PickerComponent]
})
export class SpacePickerModule {}
