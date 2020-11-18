import { Component, OnInit } from '@angular/core';
import { UserApi } from '@swagex/shared-models';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'mlw-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  toolbarColor: string;
  constructor(public configService: LayoutService, public userApi: UserApi) {
    this.toolbarColor = this.configService.toolbarColor;
  }

  ngOnInit(): void {}

  handleSignIn() {
    this.userApi.signInWithGoogle();
  }

  handleSignOut() {
    this.userApi.signOut();
  }
}
