import { Directive } from '@angular/core';

@Directive({
  selector: '[appfooter]'
})
export class FooterDirective {

  isCollapse = false;

  constructor() { }

}
