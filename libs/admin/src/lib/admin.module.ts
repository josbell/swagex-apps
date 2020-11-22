import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonUiWebComponentsModule } from '@swagex/common-ui/web-components';

import { AdminComponent } from './admin/admin.component';
import { ClassBookingsComponent } from './class-bookings/class-bookings.component';
@NgModule({
  imports: [
    CommonModule,
    CommonUiWebComponentsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminComponent },
      { path: ':id/bookings', component: ClassBookingsComponent }
    ])
  ],
  declarations: [AdminComponent, ClassBookingsComponent]
})
export class AdminModule {}
