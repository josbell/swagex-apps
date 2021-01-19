import { Component, Input } from '@angular/core';

@Component({
  selector: 'swagex-space-picker-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string;
  @Input() instructor: string;
  @Input() nextClassDate: string;
  @Input() timeDisplay: string;
  @Input() location: {
    line1: string;
    line2: string;
  };
  constructor() {}
}
