import { Component, OnInit, Input } from '@angular/core';

export interface Spot {
  id: string;
  available: boolean;
}

@Component({
  selector: 'swagex-floor-spot',
  templateUrl: './floor-spot.component.html',
  styleUrls: ['./floor-spot.component.scss']
})
export class FloorSpotComponent implements OnInit {
  @Input() spot: Spot;
  constructor() {}

  ngOnInit(): void {}
}
