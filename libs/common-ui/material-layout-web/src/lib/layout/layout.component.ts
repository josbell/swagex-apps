import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'mlw-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  toolbarColor: string;
  constructor(public configService: LayoutService) {
    this.toolbarColor = this.configService.toolbarColor;
  }

  ngOnInit(): void {}
}
