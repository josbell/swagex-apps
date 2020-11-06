import { Component } from '@angular/core';
import {
  LayoutService,
  LayoutConfig
} from '@swagex/common-ui/material-layout-web';
import { DanceClassesService } from './dance-classes.service';

@Component({
  selector: 'swagex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Eys Studio';

  constructor(
    configService: LayoutService,
    private classService: DanceClassesService
  ) {
    const frameworkConfig: LayoutConfig = {
      title: this.title,
      toolbarColor: '#fff',
      menuItems: [
        { text: 'Classes', route: '/classes', icon: 'group' },
        { text: 'Sign In', route: '/signin', icon: 'login' }
      ],
      socialIcons: [
        {
          imageFile: 'assets/social_media_icons/instagram.svg',
          alt: 'Instagram',
          link: 'http://www.instagram.com/eys.entertainment/'
        }
      ]
    };
    configService.configure(frameworkConfig);
  }
}
