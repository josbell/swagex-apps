import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';

export interface ReviewsTestimonials {
  logo: string;
  photo: string;
  text: string;
  title: string;
  subtitle: string;
}

export interface ReviewsMarkupContent {
  heading?: string;
  description?: string;
  testimonials: ReviewsTestimonials;
}

@Component({
  selector: 'swagex-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;
  @Input() content: ReviewsMarkupContent;
  public carouselOptions: NguCarouselConfig;

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
