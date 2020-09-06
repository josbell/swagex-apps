import { Component } from '@angular/core';
import {
  LayoutConfig,
  LayoutService
} from '@swagex/common-ui/material-layout-web';

@Component({
  selector: 'swagex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Latin Swag';

  constructor(configService: LayoutService) {
    const frameworkConfig: LayoutConfig = {
      title: this.title,
      toolbarColor: '#fff',
      menuItems: [
        { text: 'Schedule', route: '/schedule', icon: 'group' },
        { text: 'Lessons', route: '/lessons', icon: 'person' },
        { text: 'Services', route: '/services', icon: 'feedback' },
        {
          text: 'My Account',
          route: '/myaccount',
          icon: 'account_circle',
          submenu: [
            {
              text: 'Profile',
              route: '/myaccount/profile/view',
              icon: 'recent_actors'
            },
            {
              text: 'Subscriptions',
              route: '/myaccount/subscription/view',
              icon: 'star_rate'
            },
            { text: 'Teams', route: '/myaccount/teams/view', icon: 'group' },
            {
              text: 'Notifications',
              route: '/myaccount/notifications/view',
              icon: 'notifications'
            }
          ]
        }
      ],
      socialIcons: [
        {
          imageFile: 'assets/social_media_icons/facebook.svg',
          alt: 'Facebook',
          link: 'http://www.facebook.com'
        },
        {
          imageFile: 'assets/social_media_icons/instagram.svg',
          alt: 'Instagram',
          link: 'http://www.instagram.com'
        },
        {
          imageFile: 'assets/social_media_icons/youtube.svg',
          alt: 'Youtube',
          link: 'http://www.youtube.com'
        }
      ]
    };
    configService.configure(frameworkConfig);
  }
}
