import { Validators } from '@angular/forms';

export interface IconFiles {
  imageFile: string;
  alt: string;
  link: string;
}

export interface MenuItem {
  text: string;
  route: string;
  isVisible?: boolean;
  icon?: string;
  submenu?: MenuItem[];
  requiredRole?: string;
}

export interface LayoutConfig {
  title?: string;
  menuItems: MenuItem[];
  socialIcons?: IconFiles[];
  toolbarColor?: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}

export const usernameVal: Validators[] = [
  Validators.required,
  Validators.email
];
export const passwordVal: Validators[] = [
  Validators.required,
  Validators.minLength(6)
];
