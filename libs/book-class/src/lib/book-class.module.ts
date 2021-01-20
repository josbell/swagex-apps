import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ListContainerComponent } from './list-container/list-container.component';
import { SpacePickerContainerComponent } from './space-picker-container/space-picker-container.component';
import { CommonUiWebComponentsModule } from '@swagex/common-ui/web-components';
import { SpacePickerModule } from '@swagex/space-picker';

@NgModule({
  imports: [
    CommonModule,
    CommonUiWebComponentsModule,
    SpacePickerModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ListContainerComponent },
      { path: ':id/book', component: SpacePickerContainerComponent }
    ])
  ],
  declarations: [ListContainerComponent, SpacePickerContainerComponent],
  exports: [ListContainerComponent, SpacePickerContainerComponent]
})
export class BookClassModule {}
