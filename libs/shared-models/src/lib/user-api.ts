import { Observable } from 'rxjs';

export abstract class UserApi {
  signInWithEmail: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => void;
  signInWithFacebook?: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => void;
  signInWithGoogle?: () => void;
  signInWith?: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => void;
  signOut: () => void;
  changePassword: (
    username: string,
    oldPassword: string,
    newPassword: string
  ) => void;
  register: (userInfo: UserInfo) => void;
  hasRole: (roleName: string) => boolean;
  isLoggedIn: Observable<boolean>;
  hasSignInError: Observable<boolean>;
  signInErrorMsg: Observable<string>;
  hasRegisterError: Observable<boolean>;
  registerErrorMsg: Observable<string>;
  submitting: Observable<boolean>;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}
