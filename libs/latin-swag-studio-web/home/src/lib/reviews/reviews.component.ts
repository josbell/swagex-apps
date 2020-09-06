import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'lsw-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;
  public carouselOptions: NguCarouselConfig;
  public testimonials = [
    {
      logo: 'assets/images/mock-logo-4.png',
      photo: 'assets/images/face-1.jpg',
      text: `“I’ve tried using different softwares. The computer is not my strong side.
    There is excellent support behind DevEgret and people to walk you through it.
    If you have any questions they’ll go over that and explain to you how to do that. ”`,
      title: 'Jhone Doe',
      subtitle: 'Product Manager'
    },
    {
      logo: 'assets/images/mock-logo-2.png',
      photo: 'assets/images/face-2.jpg',
      text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit modi voluptas vero iusto fuga quos totam eius,
    atis magnam tempora doloribus ducimus dolorem culpa animi beatae tenetur! Sapiente, quia tempora."`,
      title: 'Adam Smith',
      subtitle: 'CEO'
    },
    {
      logo: 'assets/images/mock-logo-3.png',
      photo: 'assets/images/face-3.jpg',
      text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit modi voluptas vero iusto fuga quos totam eius,
    atis magnam tempora doloribus ducimus dolorem culpa animi beatae tenetur! Sapiente, quia tempora."`,
      title: 'Jhone White',
      subtitle: 'Software Engineer'
    },
    {
      logo: 'assets/images/mock-logo-1.png',
      photo: 'assets/images/face-4.jpg',
      text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit modi voluptas vero iusto fuga quos totam eius,
    atis magnam tempora doloribus ducimus dolorem culpa animi beatae tenetur! Sapiente, quia tempora."`,
      title: 'Jessica Hiche',
      subtitle: 'CEO'
    }
  ];
  constructor() {}

  ngOnInit() {
    this.carouselOptions = {
      grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
      slide: 2,
      speed: 400,
      interval: { timing: 4000 },
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true
    };
  }
}
