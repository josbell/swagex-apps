import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FloorSpotSelectionComponent } from '../floor-spot-selection/floor-spot-selection.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SelectClassDateTimeComponent } from '../select-class-date-time/select-class-date-time.component';

@Component({
  selector: 'swagex-sign-up-for-class',
  templateUrl: './sign-up-for-class.component.html',
  styleUrls: ['./sign-up-for-class.component.scss']
})
export class SignUpForClassComponent implements OnInit {
  constructor(private _bottomSheet: MatBottomSheet, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openBottomSheet(classTitle: string): void {
    const bottomSheetRef = this._bottomSheet.open(
      SelectClassDateTimeComponent,
      {
        data: { classTitle }
      }
    );

    bottomSheetRef.afterDismissed().subscribe(classId => {
      console.log(`bottomSheetRef classId ${classId}`);
      this.openDialog(classId);
    });
  }

  openDialog(classId: string) {
    const dialogRef = this.dialog.open(FloorSpotSelectionComponent, {
      data: classId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
