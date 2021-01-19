import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Spaces } from '@swagex/shared-models';

const modelInitalState = {
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
  '6': false,
  '7': false,
  '8': false,
  '9': false,
  '10': false,
  '11': false,
  '12': false,
  '13': false,
  '14': false,
  '15': false,
  '16': false,
  '17': false,
  '18': false,
  '19': false,
  '20': false
};
@Component({
  selector: 'swagex-space-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {
  allowChangeDatesAndNumberOfGuests = false;
  @Input() spaces: Spaces;
  @Output() onSpaceSelection = new EventEmitter<string>();
  bookedSpacesModel;

  constructor() {}

  ngOnInit(): void {
    this.updateModel();
  }

  ngOnChanges(_) {
    this.updateModel();
  }

  updateModel() {
    this.bookedSpacesModel = { ...modelInitalState, ...this.spaces };
  }

  isSpaceBooked(position: number): boolean {
    return this.spaces[String(position)];
  }

  onSelection(id: string) {
    this.onSpaceSelection.emit(id);
  }
}
