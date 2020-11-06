import { Injectable } from '@angular/core';

function _window(): Window {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
  constructor() {}

  get nativeWindow(): Window {
    return _window();
  }
}
