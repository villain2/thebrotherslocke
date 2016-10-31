import { Injectable } from '@angular/core';

function _window(): any {
  return window; //return global native browser window object
}

@Injectable()
export class WindowRefService {
  get nativeWindow(): any {
    return _window();
  }

  constructor() { }

}
