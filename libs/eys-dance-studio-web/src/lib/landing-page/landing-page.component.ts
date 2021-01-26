import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { REVIEW_CONTENT } from './landing-page-content';
@Component({
  selector: 'swagex-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  reviewContent = REVIEW_CONTENT;
  heroVideoUrl = '/assets/josbell-zouk.mp4';

  constructor(private router: Router) {}

  onSignUpClicked() {
    this.router.navigate(['classes']);
  }
}
