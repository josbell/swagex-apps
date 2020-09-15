import { Component } from '@angular/core';
import {
  LayoutService,
  LayoutConfig
} from '@swagex/common-ui/material-layout-web';

@Component({
  selector: 'swagex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Eys Studio';

  constructor(configService: LayoutService) {
    const frameworkConfig: LayoutConfig = {
      title: this.title,
      toolbarColor: '#fff',
      menuItems: [
        { text: 'Schedule', route: '/schedule', icon: 'group' },
        { text: 'Lessons', route: '/lessons', icon: 'person' },
        { text: 'Services', route: '/services', icon: 'feedback' }
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
