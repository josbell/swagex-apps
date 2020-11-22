import { Component, OnInit } from '@angular/core';
import { DanceClassStoreApi } from '@swagex/shared-models';

@Component({
  selector: 'swagex-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(public classStoreService: DanceClassStoreApi) {
    this.classStoreService.loadClasses();
  }

  ngOnInit(): void {}

  handleClassClick({ id, title }): void {
    console.log(id, title);
  }
}
