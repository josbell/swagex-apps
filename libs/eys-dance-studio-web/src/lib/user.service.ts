import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserApi, UserInfo } from '@swagex/shared-models';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserApi {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  hasSignInError: Observable<boolean>;
  signInErrorMsg: Observable<string>;
  hasRegisterError: Observable<boolean>;
  registerErrorMsg: Observable<string>;
  submitting: Observable<boolean>;

  constructor(private auth: AngularFireAuth) {}

  hasRole(roleName: string) {
    return true;
  }

  signInWith(username: string, passworkd: string, rememberMe: boolean) {}

  signInWithEmail(username: string, password: string, rememberMe: boolean) {}

  signInWithGoogle() {
    // this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.isLoggedIn.next(true);
  }

  signOut() {
    this.isLoggedIn.next(false);
  }

  changePassword(username: string, oldPassword: string, newPassword: string) {}

  register(userInfo: UserInfo) {}
}
