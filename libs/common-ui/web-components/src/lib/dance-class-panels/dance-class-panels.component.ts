import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DanceClass } from '@swagex/shared-models';
import { CardConfig } from '../material-card/model';

export interface ClassCard extends CardConfig {
  id: string;
  instructor: string;
  time: string;
  nextClass: string;
}

@Component({
  selector: 'swagex-dance-class-panels',
  templateUrl: './dance-class-panels.component.html',
  styleUrls: ['./dance-class-panels.component.scss']
})
export class DanceClassPanelsComponent implements OnInit {
  @Input() public danceClasses: Observable<DanceClass[]>;
  @Input() public buttonLabel: string;
  @Input() public price: string;
  @Output() public panelClicked: EventEmitter<{
    id: string;
    title: string;
  }> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onBookClassClick({ id, title }) {
    this.panelClicked.emit({ id, title });
  }
}
