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
    // this.classes = this.classStoreService.danceClasses;
  }

  // classes: ClassCard[] = [
  //   {
  //     id: '1',
  //     title: 'Reggaeton Basic',
  //     subtitle: 'Express Yourself',
  //     imageUrl:
  //       'https://dance-studio.cmsmasters.net/wp-content/uploads/2015/04/1.jpg',
  //     description: 'Shake your booty',
  //     instructor: 'Suly',
  //     time: '7:30pm Tuesday',
  //     nextClass: 'August 25',
  //     actionButtons: [{ id: 'more', label: 'More' }]
  //   },
  //   {
  //     id: '2',
  //     title: 'Reggaeton Advanced',
  //     subtitle: 'Express Yourself more intensely',
  //     imageUrl:
  //       'https://dance-studio.cmsmasters.net/wp-content/uploads/2015/04/1.jpg',
  //     description: 'Shake your booty intensely',
  //     instructor: 'Edwins',
  //     time: '8:30pm Tuesday',
  //     nextClass: 'August 25',
  //     actionButtons: [{ id: 'more', label: 'More' }]
  //   }
  // ];

  ngOnInit(): void {}

  onBookClassClick({ id, title }) {
    this.bookClassClicked.emit({ id, title });
  }
}
