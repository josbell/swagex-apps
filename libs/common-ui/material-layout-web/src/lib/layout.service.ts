import { Injectable } from '@angular/core';
import { IconFiles, MenuItem, LayoutConfig } from './model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  title?: string;
  socialIcons: IconFiles[];
  menuItems: MenuItem[];
  toolbarColor?: string;

  constructor() {}

  configure(settings: LayoutConfig) {
    Object.assign(this, settings);
  }
}
