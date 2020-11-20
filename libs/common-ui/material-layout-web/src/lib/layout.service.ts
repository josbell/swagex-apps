import { Injectable } from '@angular/core';
import { UserApi } from '@swagex/shared-models';
import { Observable } from 'rxjs';
import { IconFiles, MenuItem, LayoutConfig } from './model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private readonly menuItems: MenuItem[];
  readonly title?: string;
  readonly socialIcons: IconFiles[];
  readonly horizontalMenu = true;
  visibleMenuItems: MenuItem[];
  toolbarColor?: string;

  constructor(public userApi: UserApi) {}

  configure(settings: LayoutConfig) {
    Object.assign(this, settings);

    this.userApi.isLoggedIn.subscribe(isLoggedIn =>
      this.displayOnlyPermittedMenuItems(isLoggedIn)
    );
  }

  displayOnlyPermittedMenuItems(isLoggedIn) {
    this.visibleMenuItems = this.menuItems.filter(
      item =>
        !item.requiredRole ||
        (isLoggedIn && this.userApi.hasRole(item.requiredRole))
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.userApi.isLoggedIn;
  }

  handleSignIn() {
    this.userApi.signInWithGoogle();
  }

  handleSignOut() {
    this.userApi.signOut();
  }
}
