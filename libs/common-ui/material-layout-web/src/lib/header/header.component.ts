import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Router } from '@angular/router';
import { UserApi } from '@swagex/shared-models';

@Component({
  selector: 'mlw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public configService: LayoutService,
    public router: Router,
    public userApi: UserApi
  ) {}

  ngOnInit(): void {}

  handleSignIn() {
    this.userApi.signInWithGoogle();
  }

  handleSignOut() {
    this.userApi.signOut();
  }
}
