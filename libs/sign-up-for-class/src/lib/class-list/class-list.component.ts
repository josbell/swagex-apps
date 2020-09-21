import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardConfig } from '@swagex/common-ui/web-components';
import { DanceClassStoreApi } from '../model';

export interface ClassCard extends CardConfig {
  id: string;
  instructor: string;
  time: string;
  nextClass: string;
}

@Component({
  selector: 'swagex-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;
  @Output() public bookClassClicked: EventEmitter<{
    id: string;
    title: string;
  }> = new EventEmitter();
  actionButtons = [{ id: 'more', label: 'More' }];
  classes;

  constructor(public classStoreService: DanceClassStoreApi) {
    this.classStoreService.loadClasses();
    // Need to call method on route resolve
  }

  ngOnInit(): void {}

  onBookClassClick({ id, title }) {
    this.bookClassClicked.emit({ id, title });
  }
}
