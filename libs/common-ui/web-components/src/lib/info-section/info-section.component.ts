import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { CardConfig } from '@swagex/common-ui/web-components';

@Component({
  selector: 'swagex-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoSectionComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;
  cards: CardConfig[] = [
    {
      title: 'Adult Programs',
      subtitle: 'Express Yourself',
      imageUrl:
        'https://dance-studio.cmsmasters.net/wp-content/uploads/2015/04/1.jpg',
      description:
        'Cum sociis natoque penatibus et magnis dis parturient ntesmus. Proin velnibh et elit mollis commodo et nec augue',
      alt: 'Photo of Dancer',
      actionButtons: [{ id: 'more', label: 'More' }]
    },
    {
      title: 'About our Studio',
      subtitle: 'Who we are',
      imageUrl: '/assets/images/about-us-img.jpg',
      description:
        'Cum sociis natoque penatibus et magnis dis parturient ntesmus. Proin velnibh et elit mollis commodo et nec augue',
      alt: 'Photo of Dancer',
      actionButtons: [{ id: 'more', label: 'More' }]
    },
    {
      title: 'Youth Programs',
      subtitle: 'Our students say',
      imageUrl:
        'https://dance-studio.cmsmasters.net/wp-content/uploads/2015/04/3.jpg',
      description:
        'Cum sociis natoque penatibus et magnis dis parturient ntesmus. Proin velnibh et elit mollis commodo et nec augue',
      alt: 'Photo of Dancer',
      actionButtons: [{ id: 'more', label: 'More' }]
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
