import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { StripePaymentsService } from '@swagex/payment';
import { BookedSpace } from '@swagex/shared-models';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

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
  selector: 'swagex-floor-spot-selection',
  templateUrl: './floor-spot-selection.component.html',
  styleUrls: ['./floor-spot-selection.component.scss']
})
export class FloorSpotSelectionComponent implements OnInit {
  allowChangeDatesAndNumberOfGuests = false;
  @Input() bookedSpaces: BookedSpace[] = [];
  bookedSpacesModel;

  constructor(public paymentService: StripePaymentsService) {}

  ngOnInit(): void {
    this.updateModel();
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.updateModel();
  }

  updateModel() {
    this.bookedSpacesModel = { ...modelInitalState };
    this.bookedSpaces.forEach(
      space => (this.bookedSpacesModel[String(space.spaceNumber)] = true)
    );
  }

  isSpaceBooked(position: number): boolean {
    return this.bookedSpaces.some(
      (bookedSpace: BookedSpace) => bookedSpace.spaceNumber === position
    );
  }

  onSelection(id: string) {
    this.paymentService.createCheckoutSession();
  }
}
