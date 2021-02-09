import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CardConfig } from '@swagex/common-ui/web-components';

@Component({
  selector: 'swagex-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoSectionComponent {
  @Input('backgroundGray') public backgroundGray;
  cards: CardConfig[] = [
    {
      title: 'Industry Leaders',
      imageUrl: 'assets/images/edwins-suly.png',
      description: `
        Edwins and Suly are world class choreographers and have toured, chroeographed, and danced for many hispanic artists over the last 10 years
      `,
      alt: 'Photo of Dancer',
      actionButtons: [{ id: 'more', label: 'More' }]
    },
    {
      title: 'Keeping Our Dancers Safe',
      imageUrl: 'assets/images/social-distancing.png',
      description:
        'We keep our students safe by reserving space for each student that signs up as part of the booking process',
      alt: 'Photo of Dancer',
      actionButtons: [{ id: 'more', label: 'More' }]
    },
    {
      title: 'Youth & Adult Training',
      imageUrl: 'assets/images/kids.png',
      description: `No matter your age or skill level, Eys Dance Studio has a class or training program for you, because the world is a better place when you're dancing`,
      alt: 'Photo of Dancer',
      actionButtons: [{ id: 'more', label: 'More' }]
    }
  ];
  constructor() {}
}
