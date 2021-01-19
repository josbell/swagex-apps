import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PickerComponent } from './picker/picker.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent, PickerComponent]
})
export class SpacePickerModule {}
