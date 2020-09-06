import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Router } from '@angular/router';

import { MenuItem } from '../model';

@Component({
  selector: 'mlw-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      )
    ])
  ]
})
export class SideNavItemComponent implements OnInit {
  expanded = false;
  @Input() item: MenuItem;
  @Input() depth: number;
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter();
  constructor(public router: Router) {}

  ngOnInit(): void {}

  onItemSelected(item: MenuItem) {
    if (!item.submenu || !item.submenu.length) {
      this.onCloseMenu();
      this.router.navigate([item.route]);
    }
    if (item.submenu && item.submenu.length) {
      this.expanded = !this.expanded;
    }
  }
  onCloseMenu = () => {
    this.expanded = false;
    this.closeMenu.emit(true);
  };
}
