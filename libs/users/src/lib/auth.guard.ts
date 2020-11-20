import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { UserApi } from '@swagex/shared-models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userApi: UserApi, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userApi.isLoggedIn.pipe(
      switchMap(isLoggedIn => {
        if (isLoggedIn && this.userApi.hasRole('admin')) {
          return of(true);
        } else {
          return of(this.router.parseUrl('/home'));
        }
      })
    );
  }
}
