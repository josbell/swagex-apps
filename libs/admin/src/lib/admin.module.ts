import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonUiWebComponentsModule } from '@swagex/common-ui/web-components';

import { AdminComponent } from './admin/admin.component';
@NgModule({
  imports: [
    CommonModule,
    CommonUiWebComponentsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminComponent }
    ])
  ],
  declarations: [AdminComponent]
})
export class AdminModule {}
