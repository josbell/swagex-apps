import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Directive({
  selector: '[swagexGoogleSignin]'
})
export class GoogleSigninDirective {
  constructor(private auth: AngularFireAuth) {}

  @HostListener('click')
  onclick() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
