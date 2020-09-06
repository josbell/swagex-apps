import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'swagex-floor-spot-selection',
  templateUrl: './floor-spot-selection.component.html',
  styleUrls: ['./floor-spot-selection.component.scss']
})
export class FloorSpotSelectionComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' }
  ];
  spots = [
    { id: 1, available: false },
    { id: 2, available: true },
    { id: 3, available: true },
    { id: 4, available: false },
    { id: 5, available: true },
    { id: 6, available: true },
    { id: 7, available: false },
    { id: 8, available: true },
    { id: 9, available: true },
    { id: 10, available: false },
    { id: 11, available: true },
    { id: 12, available: true },
    { id: 13, available: false },
    { id: 14, available: true },
    { id: 15, available: true },
    { id: 16, available: true },
    { id: 17, available: true },
    { id: 18, available: true },
    { id: 19, available: true },
    { id: 20, available: true }
  ];
  constructor() {}

  ngOnInit(): void {}
}
