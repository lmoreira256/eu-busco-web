import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  private notCodes = [13, 8, 37, 39, 46];

  constructor() { }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    debugger
    console.log('code' + event.keyCode);
    console.log('which' + event.which);
    return (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105);
    //return (/[0-9]+/.test(event.key) && !event.ctrlKey && !event.shiftKey && !event.altKey) || this.notCodes.find((x: any) => (x === event.keyCode)) !== undefined;
  }

}
