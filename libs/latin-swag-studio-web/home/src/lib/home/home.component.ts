import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ls-studio-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  heroVideoUrl = '/assets/hero_video.mp4';

  styles = [
    'Jazz Funk',
    'Modern Dance',
    'House Dance',
    'Strip Dance',
    'Disco Dance',
    'Tango'
  ];

  constructor(private router: Router) {}

  onSignUpClicked() {
    this.router.navigate(['classes']);
  }

  ngOnInit(): void {}
}
