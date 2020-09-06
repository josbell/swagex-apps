import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mlw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public configService: LayoutService, public router: Router) {}

  ngOnInit(): void {}
}
