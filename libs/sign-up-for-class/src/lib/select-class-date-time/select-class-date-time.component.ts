import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'swagex-select-class-date-time',
  templateUrl: './select-class-date-time.component.html',
  styleUrls: ['./select-class-date-time.component.scss']
})
export class SelectClassDateTimeComponent implements OnInit {
  classes = [
    { id: '1', date: 'Sep 1', time: '8:30pm', weekday: 'Tue', openSlots: '5' },
    { id: '2', date: 'Sep 8', time: '8:30pm', weekday: 'Tue', openSlots: '5' },
    { id: '3', date: 'Sep 15', time: '8:30pm', weekday: 'Tue', openSlots: '5' },
    { id: '4', date: 'Sep 22', time: '8:30pm', weekday: 'Tue', openSlots: '5' }
  ];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<SelectClassDateTimeComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('bottom sheet data', this.data);
  }

  onSelection(id: string) {
    console.log('on selection', id);
    this._bottomSheetRef.dismiss(id);
  }
}
