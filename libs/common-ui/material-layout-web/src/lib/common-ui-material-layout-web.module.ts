import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonUiMaterialModule } from '@swagex/common-ui/material';

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SideNavItemComponent } from './side-nav-item/side-nav-item.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { SocialMediaBarComponent } from './social-media-bar/social-media-bar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    SideNavItemComponent,
    ContentComponent,
    FooterComponent,
    SocialMediaBarComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    CommonUiMaterialModule
  ],
  exports: [LayoutComponent]
})
export class CommonUiMaterialLayoutWebModule {}
