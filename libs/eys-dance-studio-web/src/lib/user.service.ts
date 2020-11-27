import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserApi, UserInfo, User } from '@swagex/shared-models';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserApi {
  user: User;
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  hasSignInError: Observable<boolean>;
  signInErrorMsg: Observable<string>;
  hasRegisterError: Observable<boolean>;
  registerErrorMsg: Observable<string>;
  submitting: Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.auth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.afs
              .doc<User>(`users/${user.uid}`)
              .valueChanges()
              .pipe(
                tap((user: User) => {
                  this.user = user;
                  this.isLoggedIn.next(true);
                })
              );
          } else {
            return of(null);
          }
        })
      )
      .subscribe();
  }

  hasRole(roleName: string): boolean {
    return this.user?.roles?.includes(roleName);
  }

  signInWith(username: string, passworkd: string, rememberMe: boolean) {}

  signInWithEmail(username: string, password: string, rememberMe: boolean) {}

  async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credentials = await this.auth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  async signOut() {
    await this.auth.signOut();
    this.isLoggedIn.next(false);
    this.router.navigate(['/']);
  }

  private updateUserData({
    uid,
    email,
    displayName,
    phoneNumber,
    photoURL
  }: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      phoneNumber,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }

  changePassword(username: string, oldPassword: string, newPassword: string) {}

  register(userInfo: UserInfo) {}
}
